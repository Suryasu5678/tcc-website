<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/SMTP.php';

$from_email = "YOUREMAIL@gmail.com";
$from_email_password = "your_app_password";
$from_email_name = "Your Name";
$to_email = "RECEIVER_EMAIL@gmail.com";
$to_email_name = "Receiver";
$email_subject = "New Appointment Request";

function field_name($key) {
    return ucwords(str_replace(array('-', '_'), ' ', $key));
}

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

if (!empty($_POST)) {
    $required = ['name', 'email', 'phone', 'insurance', 'days', 'subject', 'primary-care', 'message'];
    $errors = [];

    foreach ($required as $field) {
        if (empty($_POST[$field]) && !is_array($_POST[$field])) {
            $errors[] = "Field <strong>".field_name($field)."</strong> is required.";
        }
    }

    if (!isValidEmail($_POST['email'])) {
        $errors[] = "Email address is invalid.";
    }

    if (!empty($errors)) {
        echo '<div class="alert alert-danger"><ul><li>' . implode('</li><li>', $errors) . '</li></ul></div>';
        exit;
    }

    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->SMTPDebug = SMTP::DEBUG_OFF;
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'tls';
    $mail->Username = $from_email;
    $mail->Password = $from_email_password;

    $mail->setFrom($from_email, $from_email_name);
    $mail->addAddress($to_email, $to_email_name);
    $mail->addReplyTo($_POST['email'], $_POST['name']);
    $mail->Subject = $email_subject;

    $body = "<h3>Appointment Details</h3><table border='1' cellpadding='6'>";
    foreach ($_POST as $key => $value) {
        if (is_array($value)) {
            $value = implode(", ", $value);
        }
        $body .= "<tr><td><strong>".field_name($key)."</strong></td><td>$value</td></tr>";
    }
    $body .= "</table>";

    $mail->msgHTML($body);

    if ($mail->send()) {
        echo '<div class="alert alert-success">Appointment request sent successfully!</div>';
    } else {
        echo '<div class="alert alert-danger">Mailer Error: ' . $mail->ErrorInfo . '</div>';
    }
} else {
    echo "No data received.";
}
