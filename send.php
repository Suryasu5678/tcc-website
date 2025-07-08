<?php
/**
 * Simple email script using PHP mail() function.
 */

/* ========================================================================== */
/* Email Settings: Please change these variables                               */

$from_email        = "stephen00730@outlook.com";
$from_email_name   = "Stephen";
$to_email          = "ajithkumar.ps@spritle.com";
$to_email_name     = "Ajithkumar PS";
$email_subject     = 'Contact Inquiry from Twin Cities Cardiology';

/* ========================================================================== */


/* Form fields you want to receive in email */
$field_list = array(
    'name',
    'email',
    'number',
    'subject',
    'message',
);

$required_fields = array(
    'name',
    'email',
    'number',
    'subject',
    'message',
);

$email_fields = array(
    'email'
);

/* ========================================================================== */

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) 
        && preg_match('/@.+\./', $email);
}

function field_name($key) {
    $return = '';
    if( !empty($key) ){
        $return = str_replace('_', ' ', $key);
        $return = str_replace('-', ' ', $return);
        $return = ucwords($return);
    }
    return $return;
}

if( !empty($_POST) ){

    // check if all required fields are not empty
    $error_message = '';

    foreach( $_POST as $key=>$value ){
        if( !empty($key) && in_array( $key, $required_fields ) ){
            $field_name = field_name($key);
            if( empty($value) ){
                $error_message .= '<li>The "'.$field_name.'" Field is required. Please fill it and submit again</li>' ;
            } else if( in_array( $key, $email_fields ) && isValidEmail($value) == false ){
                $error_message .= '<li>The "'.$field_name.'" email is not valid email</li>' ;
            }
        }
    }

    if( !empty($error_message) ){
        echo '<div class="alert alert-danger" role="alert">Please fill required fields: <br> <ul>' . $error_message . '</ul> <br> </div>';
        die();
    } else {
        // all required files are valid.. continue to send email
        $email_body = '<h2>User Submitted Details</h2><table style="border: 1px solid #b5b5b5; padding: 5px;">';
        foreach( $_POST as $key=>$value ){
            if( in_array( $key, $field_list ) ){
                $field_name = field_name($key);
                $email_body .= '<tr>
                    <td style="border: 1px solid #b5b5b5; padding: 5px;"><strong>'.$field_name.'</strong> </td>
                    <td style="border: 1px solid #b5b5b5; padding: 5px;">: '.$value.'</td>
                </tr>';
            }
        }
        $email_body .= '</table>';

        // Set content-type header for HTML email
        $headers  = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        // Additional headers
        $headers .= "From: $from_email_name <$from_email>\r\n";
        $headers .= "Reply-To: $from_email\r\n";

        if (mail($to_email, $email_subject, $email_body, $headers)) {
            echo '<div class="alert alert-success" role="alert">Thank you for contacting us.<br> Our team will be in touch soon!! </div>';
        } else {
            echo '<div class="alert alert-danger" role="alert">Error.. cannot send email. Please try again later.</div>';
        }
    }

} else {
    die('<p>Please go to Contact page and fill the contact form.</p>');
}

