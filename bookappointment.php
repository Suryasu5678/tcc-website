<?php
require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

/**
 * Book Appointment Form Handler
 * Uses Resend Mail API to send appointment requests via email.
 */

// Email Settings
$resend_api_key = $_ENV['RESEND_API_KEY']; // <-- Replace with your Resend API key
$from_email     = $_ENV['FROM_EMAIL'];
$from_email_name= "TCC";
$to_email       = $_ENV['BOOK_APPOINTMENT_TO_EMAIL'];
$to_email_name  = "Twin Cities Cardiology Appointment";
$email_subject  = 'Appointment Request from Twin Cities Cardiology';

// Form fields to receive in email
$field_list = array(
    'name',
    'email',
    'phone',
    'insurance',
    'slots',
    'message',
);

// Required fields
$required_fields = array(
    'name',
    'email',
    'phone',
    'insurance',
    'slots',
    'message',
);

// Email fields for validation
$email_fields = array(
    'email'
);

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) 
        && preg_match('/@.+\./', $email);
}

function field_name($key) {
    $return = '';
    if (!empty($key)) {
        $return = str_replace('_', ' ', $key);
        $return = str_replace('-', ' ', $return);
        $return = ucwords($return);
    }
    return $return;
}

if (!empty($_POST)) {
    $error_message = '';

    // Validate required fields
    foreach ($required_fields as $key) {
        if ($key === 'slots') {
            if (empty($_POST['slots']) || !is_array($_POST['slots'])) {
                $error_message .= '<li>Please select at least one available day.</li>';
            }
        } else {
            $value = isset($_POST[$key]) ? trim($_POST[$key]) : '';
            if (empty($value)) {
                $error_message .= '<li>The "' . field_name($key) . '" field is required.</li>';
            } elseif (in_array($key, $email_fields) && !isValidEmail($value)) {
                $error_message .= '<li>The "' . field_name($key) . '" is not a valid email.</li>';
            }
        }
    }

    if (!empty($error_message)) {
        echo '<div class="alert alert-danger" role="alert">Please fill required fields: <br> <ul>' . $error_message . '</ul> <br> </div>';
        die();
    } else {
        // Build email body
        $email_body = '<h2>Appointment Form Submission Details</h2><table style="border: 1px solid #b5b5b5; padding: 5px;">';
        foreach ($field_list as $key) {
            if ($key === 'slots') {
                $slots = isset($_POST['slots']) && is_array($_POST['slots']) ? implode(', ', $_POST['slots']) : '';
                $email_body .= '<tr>
                    <td style="border: 1px solid #b5b5b5; padding: 5px;"><strong>Available slots</strong></td>
                    <td style="border: 1px solid #b5b5b5; padding: 5px;">: ' . htmlspecialchars($slots) . '</td>
                </tr>';
            } else {
                $value = isset($_POST[$key]) ? $_POST[$key] : '';
                $email_body .= '<tr>
                    <td style="border: 1px solid #b5b5b5; padding: 5px;"><strong>' . field_name($key) . '</strong></td>
                    <td style="border: 1px solid #b5b5b5; padding: 5px;">: ' . htmlspecialchars($value) . '</td>
                </tr>';
            }
        }
        $email_body .= '</table>';

        $reply_to_email = isset($_POST['email']) ? $_POST['email'] : '';

        // Send email using Resend API
        $resend = Resend::client($resend_api_key);

        try {
            $res = $resend->emails->send([
                'from' => "$from_email_name <$from_email>",
                'to' => [$to_email],
                'subject' => $email_subject,
                'html' => $email_body,
                'reply_to' => $reply_to_email,
            ]);
            echo '<div class="alert alert-success" role="alert">Thank you for your appointment request.<br/>Our team will contact you soon!!</div>';
        } catch (Exception $e) {
            echo '<div class="alert alert-danger" role="alert">Error: Cannot send email.<br>' . $e->getMessage() . '</div>';
        }
    }
} else {
    die('<p>Please fill the appointment form.</p>');
}
?>