<?php
/**
 * Book Appointment Form Handler
 * Uses PHPMailer to send appointment requests via email.
 */

// SMTP Email Settings
$from_email             = "psajithkumar97@gmail.com";
$from_email_password    = "wkus hlnt cocm xgvd";
$from_email_name        = "Ajith kumar";
$to_email               = "ajithkumar.ps@spritle.com";
$to_email_name          = "Ajithkumar PS";
$email_subject          = 'Appointment Request from Twin Cities Cardiology';

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

// PHPMailer setup
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

date_default_timezone_set('Etc/UTC');

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/SMTP.php';

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

function save_mail($mail) {
    $path = '{imap.gmail.com:993/imap/ssl}[Gmail]/Sent Mail';
    $imapStream = imap_open($path, $mail->Username, $mail->Password);
    $result = imap_append($imapStream, $path, $mail->getSentMIMEMessage());
    imap_close($imapStream);
    return $result;
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

        // Send email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->SMTPDebug = SMTP::DEBUG_OFF;
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = "tls";
        $mail->Username   = $from_email;
        $mail->Password   = $from_email_password;
        $mail->setFrom($from_email, $from_email_name);
        $mail->addReplyTo($from_email, $from_email_name);
        $mail->addAddress($to_email, $to_email_name);
        $mail->Subject = $email_subject;
        $mail->msgHTML($email_body);

        if ($mail->send()) {
            echo '<div class="alert alert-success" role="alert">Thank you for your appointment request.<br/>Our team will contact you soon!!</div>';
            // save_mail($mail); // Uncomment if you want to save to Sent Mail
        } else {
            echo '<div class="alert alert-danger" role="alert">Error: Cannot send email.<br>' . $mail->ErrorInfo . '</div>';
        }
    }
} else {
    die('<p>Please fill the appointment form.</p>');
}
?>