<?php
require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
/**
 * This is email script based on Resend Mail API. Please configure your Resend API key below.
 */

/* ========================================================================== */
/* Email Settings: Please change these variables                              */

$resend_api_key = $_ENV['RESEND_API_KEY']; // <-- Replace with your Resend API key
$from_email     = $_ENV['FROM_EMAIL'];
$from_email_name= "TCC";
$to_email       = $_ENV['CONTACT_TO_EMAIL'];
$to_email_name  = "Twin Cities Cardiology Contact";
$email_subject  = 'Contact Inquiry from Twin Cities Cardiology';

/* ========================================================================== */


/* ========================================================================== */
/* Form fields you want to receive in email                                   */
/* This is array so just write the name set in the form                       */

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


/* Do not modify after this line */
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

$email_status = false;
$email_status_message = '';

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

    if( !empty($error_message) ) {
        echo '<div class="alert alert-danger" role="alert">Please fill required fields: <br> <ul>' . $error_message . '</ul> <br> </div>';
        die();
    } else {
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


        $reply_to_email = isset($_POST['email']) ? $_POST['email'] : '';

		// Resend API integration
        $resend = Resend::client($resend_api_key); // Replace with your actual API key

        try {
            $res = $resend->emails->send([
                'from' => "$from_email_name <$from_email>",
                'to' => [$to_email],
                'subject' => $email_subject,
                'html' => $email_body,
				'reply_to' => $reply_to_email,
            ]);
            echo '<div class="alert alert-success" role="alert">Thank you for contacting us.<br> Our team will be in touch soon!! </div>';
        } catch (Exception $e) {
            echo '<div class="alert alert-danger" role="alert">Error.. cannot send email: <br> ' . $e->getMessage() . ' </div>';
        }
    }
} else {
    die('<p>Please go to Contact page and fill the contact form.</p>');
}