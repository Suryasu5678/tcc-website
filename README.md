# Twin Cities Cardiology Website

## Project Overview
This is the official website for Twin Cities Cardiology, a healthcare provider specializing in cardiovascular care. The website offers information about the clinic's services, locations, insurance plans accepted.

## Features
- Informational pages about cardiology services, vascular medicine, executive health physicals, and concierge programs.
- Interactive homepage with video banner, service highlights, testimonials, and insurance partners carousel.
- Multiple clinic locations with clickable addresses linked to maps.
- Online appointment booking form with backend email integration.
- Contact form with AJAX submission and validation.
- Responsive design using Bootstrap and custom CSS.
- Smooth animations and interactive UI elements using JavaScript and jQuery plugins.

## Technologies Used
- HTML5, CSS3, JavaScript
- PHP for backend form handling
- Resend Mail API for sending appointment request emails
- Bootstrap 5 for responsive layout and components
- Various icon libraries: FontAwesome, Flaticon, Themify Icons

## Setup Instructions
1. Clone or download the repository.
2. Ensure a PHP-enabled web server is available to serve the site and handle backend PHP scripts.
3. Install dependencies via Composer:
   ```bash
   composer install
   composer require vlucas/phpdotenv
   composer require resend/resend-php
```
4. Create a `.env` file in the root directory with the following environment variables:
   ```
   RESEND_API_KEY=your_resend_api_key_here
   FROM_EMAIL=your_from_email@example.com
   CONTACT_TO_EMAIL=recipient_email@example.com
   BOOK_APPOINTMENT_TO_EMAIL=recipient_email@example.com
   ```
5. Place the website files in your web server's root or appropriate directory.
6. Ensure the `bookappointment.php` script is accessible and configured correctly to send emails.
