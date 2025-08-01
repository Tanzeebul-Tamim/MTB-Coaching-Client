<h1 style="display: flex; align-items: center;">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/logo.png" alt="MTB Coaching Logo" width="100"/>
    <span>MTB-Coaching - Project Features</span>
</h1>

A comprehensive breakdown of all the key features and functionalities built into the **_Professional Mountain Biking Coaching Network_** website — from dynamic interfaces and secure authentication to real-time course management and responsive design. This document highlights both technical implementations and user-facing capabilities to give you a complete overview of the project.

## 📑 Table of Contents

-   [**Core Features & Functionalities**](#core-features--functionalities)

    -   [Mobile Responsive Design](#mobile-responsive-design)
    -   [Adaptive Theme Toggle: Dark & Light Modes](#adaptive-theme-toggle-dark--light-modes)
    -   [Toast, Alert & Confirmation Notifications](#toast-alert--confirmation-notifications)
    -   [Custom Cursor & Scrollbar](#custom-cursor--scrollbar)
    -   [Custom Skeleton Loaders](#custom-skeleton-loaders)
    -   [Installable PWA Button](#installable-pwa-button)
    -   [Dynamic Content Suggestions (YouTube API Integration)](#dynamic-content-suggestions-youtube-api-integration)
    -   [Email System](#email-system)
    -   [Authentication](#authentication)
        -   [Register](#register)
        -   [Email Verification](#email-verification)
        -   [Login](#login)
        -   [Password Reset](#password-reset)
            -   [Forgot Password](#forgot-password)
            -   [Change or Set Password](#change-or-set-password)
            -   [Password Reset Email Notification](#password-reset-email-notification)
        -   [Google Authentication](#google-authentication)
        -   [Access Control](#access-control)
            -   [Private Routes](#private-routes)
            -   [Role Based Routes](#private-routes)

    <br>

-   [**Page Overviews & UI Walkthrough**](#page-overviews--ui-walkthrough)
    -   [Dynamic Home Page](#dynamic-home-page)
    -   [Footer](#footer)
    -   [Courses Page](#courses-page)
    -   [Instructors Page](#instructors-page)
    -   [Instructor's Wall](#instructors-wall)
    -   [Interactive Dashboard](#interactive-dashboard)
        -   [Student Dashboard](#student-dashboard)
            -   [Student Profile](#student-profile)
            -   [Booked Courses](#booked-courses)
            -   [Enrolled Courses](#enrolled-courses)
            -   [Payment Methods](#payment-methods)
            -   [Payment History](#payment-history)
        -   [Instructor Dashboard](#instructor-dashboard)
            -   [Instructor Profile](#instructor-profile)
            -   [My Wall](#my-wall-instructors-public-profile)
            -   [Add a Course](#add-a-course)
            -   [My Offered Courses](#my-offered-courses)
            -   [My Students](#my-students)
    -   [Informational & System Pages](#informational--system-pages)
        -   [404 Not Found](#404-not-found)
        -   [No Internet](#no-internet)
        -   [About Us](#about-us)
        -   [Faq & Support](#faq--support)
        -   [Legal Information](#legal-information)

<br>

## Core Features & Functionalities

<span style="font-size:1.05em; font-weight:bold;">
      This section highlights the key technical features and app-wide capabilities that enhance performance, usability, and user experience.
</span>

<br>

### Mobile Responsive Design

The entire website is built to be mobile-friendly and adapts seamlessly to smartphones.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/responsive.png" width="850" alt="Responsive Home Page Preview"/>
</p>

<br>

### Adaptive Theme Toggle: Dark & Light Modes

The application supports both dark and light themes, automatically adjusting based on the user's system preferences. Users can manually toggle the theme as well, ensuring a comfortable experience in any lighting condition.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/dark_mode.png" width="49%" alt="Dark Theme Example"/>
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/light_mode.png" width="49%" alt="Light Theme Example"/>
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/responsive_theme_toggle.jpg" width="59%" alt="Responsive Theme Toggle UI"/>
</p>

> **Note:** <br>
>
> The theme toggle [**_logic_**](./src/components/ui/ThemeToggle/useThemeToggle.js) and [**_implementation_**](./src/components/ui/ThemeToggle/ThemeToggle.jsx) details can be found in the source code.

<br>

### Toast, Alert & Confirmation Notifications

To provide quick and meaningful feedback to users, the application uses two libraries for notifications:

* [`react-toastify`](https://fkhadra.github.io/react-toastify/introduction) — for non-blocking toast messages (e.g., success/error feedback).
* [`SweetAlert2`](https://sweetalert2.github.io/) — for modal alerts (e.g., confirmation dialogs, warnings).

These tools are used throughout the app to improve user interaction and enhance the overall UX.

You’ll find examples of them in action in the following sections:

* ✅ [Email Verification](#email-verification)
* ✅ [Forgot Password](#forgot-password)
* ✅ [Private Routes](#private-routes)
* ✅ [Role Based Routes](#role-based-routes)
* ✅ [Payment Methods](#payment-methods)


<br>

### Custom Cursor & Scrollbar

Custom animated cursor and styled scrollbar for enhanced aesthetics (desktop only).

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/cursor_and_scrollbar.png" width="850" alt="Custom Cursor and Scrollbar Demo"/>
</p>

<br>

### Custom Skeleton Loaders

The app features fully customized skeleton loaders tailored to the UI design, providing smooth and visually consistent loading placeholders throughout the application. These loaders improve perceived performance and maintain user engagement during data fetching on various pages and components.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/skeleton-1.gif" width="850" alt="Skeleton Loader Example 1"/>
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/skeleton-2.gif" width="850" alt="Skeleton Loader Example 2"/>
</p>

<br>

### Installable PWA Button

A floating `🚴‍♂️ Install the App` button appears briefly at intervals and fades out to reduce distraction. Users can install the _Progressive Web App (PWA)_ to their home screen for a native-app-like experience.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/pwa.gif" width="850" alt="Installable PWA Button Demo"/>
</p>

> **Note:** <br>
>
> The progressive web app [**_logic and implementation_**](./src/components/ui/InstallPWAButton.jsx) details can be found in the source code.

<br>

### Dynamic Content Suggestions (YouTube API Integration)

Videos are dynamically fetched from YouTube using the YouTube Data API based on the selected bike type. Logged-in users can personalize results via a dropdown. A responsive carousel layout ensures smooth viewing, with fallback videos shown if API data isn’t available..

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/yt_api.gif" width="850" alt="YouTube API Integration Demo"/>
</p>

> **Note:** <br>
>
> The YouTube API integration [**_logic_**](./src/hooks/useYouTubeSearch.js) and [**_implementation_**](./src/pages/Home/BikeHacks/BikeHacks.jsx#L20-L94) details can be found in the source code.

<br>

### Email System

This site supports transactional email notifications (such as enrollment confirmations and payment receipts) for users. This feature is implemented on the [_server_](https://github.com/Tanzeebul-Tamim/MTB-Coaching-Server) side.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/mail.png" width="850" alt="Transactional Email Example"/>
</p>

> **Note:** <br>
>
> For details, see the [**_Email System_ section in the server documentation**](https://github.com/Tanzeebul-Tamim/MTB-Coaching-Server#-email-system).

<br>

### Authentication

Users can register as instructors or students and log in using their registered email and password or social accounts. You can try this feature using the [**_Demo Credentials_**](./README.md#-demo-access--credentials) provided in the README.

#### Register

-   **_As Student:_**
    <p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/register-s.png" width="850"  alt="Student Registration Form"/>
    </p>

    <br>

-   **_As Instructor:_**
    <p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/register-i.png" width="850"  alt="Instructor Registration Form"/>
    </p>

    <br>

-   Both students and instructors can register by providing their name, email, contact number, address, gender, password, and a profile image.
-   Passwords must meet security requirements (minimum length, uppercase, digit, special character).
-   After registration, a verification email is sent to activate the account.
-   Provides real-time password strength feedback, showing which criteria (uppercase, numbers, special characters, minimal length) are met. The confirm password field and submit button remain disabled until all requirements are fulfilled.

      <br>

#### Email Verification

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/email_verification.png" width="850" alt="Email Verification UI"/>
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/email_verification_mail.png" width="850" alt="Email Verification Mail Example"/>
</p>

-   After registration, a verification email is sent to the user's email address.
-   Users must verify their email before they can log in.
-   If a user tries to log in without verifying their email, they will be prompted to verify first and logged out automatically.
-   A success message is shown after registration, instructing users to check their email for the verification link.

> **⚠️ Note:** <br>
>
> Check your inbox for the email verification link. If it doesn’t arrive within a few minutes, check your _Spam_ or _Junk folder_.

<br>

#### Login

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/login.png" width="850" alt="Login Page UI"/>
</p>

-   Captcha validation is required for login to enhance security.
-   Social login option (Google) is also available for quick access.
-   Only users with verified emails can log in.

<br>

#### Password Reset

Users can access their account either by resetting a forgotten password or setting a new one if they signed up using Google. Both processes send a secure password link via email for a smooth and safe experience.

##### Forgot Password

<p align="center">
<img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/forgot_password.png" width="850" alt="Forgot Password UI"/>
</p>

-   Users can reset their password by clicking **_`Forgot password?`_** and entering their registered email.
-   A password reset email is sent to the user's registered email address which allows users to set a new password securely.

> **⚠️ Note:** <br>
>
> Check your inbox for the password reset link. If it doesn’t arrive within a few minutes, check your _Spam_ or _Junk folder_.

<br>

##### Change or Set Password

<p align="center">
<img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/change_password.png" width="850" alt="Change or Set Password UI"/>
</p>

-   Users can also update their password directly from their user dashboard after logging in.
-   Additionally, users who signed in via Google and don’t have a password yet can create one here. Upon submitting, they will receive an email link to securely set their new password.
-   Provides real-time password strength feedback, showing which criteria (uppercase, numbers, special characters, minimal length) are met. The confirm password field and submit button remain disabled until all requirements are fulfilled.

<br>

##### Password Reset Email Notification

Users receive this email with a secure link to reset or set their password after initiating either `Forgot password` or `Create a password` from their dashboard.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/password_reset_mail.png" width="850" alt="Password Reset Email Example"/>
</p>

> **⚠️ Note:** <br>
>
> Check your inbox for the password reset link. If it doesn’t arrive within a few minutes, check your _Spam_ or _Junk folder_.

<br>

#### Google Authentication

Users can sign-in/sign-up quickly and securely using their Google accounts. This option simplifies access without the need to create a separate password during registration.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/google_authentication.png" width="850" alt="Google Authentication UI"/>
</p>

<br>

#### Access Control

The application enforces strict access control with protected routes and role-based permissions.

##### Private Routes

`Dashboard` and `instructors' wall` are protected routes and only accessible to authenticated users (requires signing in). Unauthenticated users are automatically redirected to the login page.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/private-route.gif" width="850" alt="Private Route Redirect Demo"/>
</p>

_This GIF demonstrates an unauthenticated user being redirected to the login page when attempting to access a private route, and then being redirected back to the intended page after successful login._

<br>

##### Role Based Routes

Some routes are further restricted based on user roles (e.g., only instructors can access course creation pages, only students can access payment pages). Unauthorized users are redirected and shown an appropriate message.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/role-route.gif" width="850" alt="Role Based Route Redirect Demo"/>
</p>

_This GIF demonstrates an instructor being redirected to the home page when attempting to access a student-only route._

<br>

## Page Overviews & UI Walkthrough

<span style="font-size:1.05em; font-weight:bold;">
      This section provides detailed insights into each page’s layout, design, and user interface elements, guiding readers through the app’s visual flow and user interactions.
</span>

<br>

### Dynamic Home Page

Includes a slider, typewriter animation, popular instructors/courses, and embedded YouTube bike hack videos.

<p align="center">
<img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/dynamic_homepage.png" width="750" alt="Dynamic Home Page UI"/>
</p>

<br>

### Footer

A meaningful footer is present on all pages except dashboard, including a mini map, ensuring consistency and providing essential links or information.

<p align="center">
<img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/footer.png" width="850" alt="Website Footer UI"/>
</p>

<br>

### Courses Page

Users can search for courses, check course & seat status, view price and all other details. The page also allows users to book courses directly.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/courses.png" width="850" alt="Courses Page UI"/>
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/course-info-1.png" width="850" alt="Course Info Modal Example 1"/>
</p>

<br>

### Instructors' Page

Users can search for instructors, view their name, email, and the number of courses they have taken. Users can also visit the [_instructors' individual walls_](#instructors-wall) for more detailed information.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/instructors.png" width="850" alt="Instructors Page UI"/>
</p>

<br>

### Instructors' Wall

Separate dedicated page for each instructor to showcase all the courses offered by them.

<p align="center">
<img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/instructors_wall.png" width="850" alt="Instructor Wall UI"/>
</p>
<p align="center">
<img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/course-info-2.png" width="850" alt="Course Info Modal Example 2"/>
</p>

<br>

### Interactive Dashboard

Separate dashboards for students and instructors. All dashboard pages featuring data tables include a built-in search bar, name-based filtering, and a smooth pagination system for efficient browsing and management.

#### Student Dashboard

##### Student Profile

View and update personal information, including profile photo and [_password change/creation_](#change-or-set-password).

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/user-profile-s.png" width="850" alt="Student Profile UI"/>
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/update-profile.png" width="850" alt="Update Student Profile UI"/>
</p>

> **⚠️ Note:** <br>
>
> - Users who signed up via Google and have not completed their additional profile information must update their profile here before they can purchase courses or make transactions.
> - Updates may take a few moments to reflect on the user interface. If changes aren't visible yet, please try reloading the page.

<br>

##### Booked Courses

Shows unpaid courses with all details and cancellation options.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/booked-courses.png" width="850" alt="Booked Courses Table UI"/>
</p>

<br>

##### Enrolled Courses

Displays all paid and enrolled courses.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/enrolled-courses.png" width="850" alt="Enrolled Courses Table UI"/>
</p>

<br>

##### Payment Methods

Allows students to make secure payments via Stripe. You can try this feature using the [**_Test Payment Info_**](./README.md#-test-payment-info-stripe) provided in the README.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/payment.gif" width="850" alt="Stripe Payment Demo"/>
</p>

<br>

##### Payment History

Track transaction details, including status and timestamps.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/payment-history.png" width="850" alt="Payment History Table UI"/>
</p>

<br>

#### Instructor Dashboard

##### Instructor Profile

View and update personal information, including profile photo, cover photo, quote and [_password change/creation_](#change-or-set-password).

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/user-profile-i.png" width="850" alt="Instructor Profile UI"/>
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/update-profile-i.png" width="850" alt="Update Instructor Profile UI"/>
</p>

> **⚠️ Note:** <br>
>
> - Users who signed up via Google and have not completed their additional profile information must update their profile here before they can purchase courses or make transactions.
> - Updates may take a few moments to reflect on the user interface. If changes aren't visible yet, please try reloading the page.

<br>

##### My Wall (Instructors' public profile)

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/my-wall.png" width="850" alt="My Wall (Instructor Public Profile) UI"/>
</p>

-   Instructors can access their own public profile page directly from their dashboard.
-   The instructor's wall cover image can be updated from the [_profile page_](#instructor-profile) in the dashboard.
-   Notice that instructors don't have a "Book Course" button on their own wall, unlike what students see on instructor profiles.

<br>

##### Add a Course

A detailed form to create and publish new courses.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/add-a-course.png" width="850" alt="Add a Course Form UI"/>
</p>

<br>

##### My Offered Courses

Lists all courses created by the instructor.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/my-courses.png" width="850" alt="My Offered Courses Table UI"/>
</p>

<br>

##### My Students

View and search all students enrolled in a specific course offered by the instructor.

<p align="center">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/my-students.png" width="850" alt="My Students Table UI"/>
</p>

Instantly filter students using the integrated search feature by:

-   Name
-   Email
-   Contact number

<br>

#### Informational & System Pages

A collection of auxiliary pages like 404, About Us, Legal Info, and others that enhance usability and provide essential information.

##### 404 Not Found

A custom _404 Not Found_ page with an added GIF, enhancing the user experience in case of page not found errors.

<p align="center">
<img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/not-found-404.gif" width="850" alt="404 Not Found Page"/>
</p>

<br>

##### No Internet

A custom _No Internet_ page with a playful offline message and visual cue, guiding users to reconnect and resume their journey smoothly.

<p align="center">
<img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/no-internet.png" width="850" alt="No Internet Page UI"/>
</p>

<br>

##### About Us

This page provides information about the website's purpose and other relevant details, helping users understand the mission and vision of the platform.

<p align="center">
<img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/about-us.png" width="850" alt="About Us Page UI"/>
</p>

<br>

##### FAQ & Support

This page provides answers to common questions and offers support resources to help users navigate and make the most of the platform. It is designed with clear sections for easy access and quick guidance.

<p align="center">  
  <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/faq.png" width="850" alt="FAQ & Support Page UI"/>  
</p>

-   **Getting Started:** Guidance for new users on account creation, navigating features, and using tooltips for help.
-   **Troubleshooting:** Common issues like login problems, slow loading, and layout errors, with tips on how to resolve them or get help.
-   **Account & Data:** Information on managing personal data securely through the dashboard, with instructions on data deletion via the Legal section.
-   **Contact Support:** Provides an email contact for users to report bugs or request help, with tips on what info to include for efficient assistance.

<br>

##### Legal Information

This page presents all legal information in a visually appealing, organized, and accessible format. Each section is directly accessible via anchor links from the site footer for user convenience.

<p align="center">
<img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/legal.png" width="850" alt="Legal Information Page UI"/>
</p>

-   **Privacy Policy:** Clear explanation of how user data (e.g., Google login) is handled and protected. No tracking or data sharing involved.
-   **Terms of Service:** Describes the non-commercial, educational nature of the project and usage limitations.
-   **User Data Deletion:** Provides a simple manual process to request data removal via email.
-   **Cookie Notice:** Discloses use of essential cookies for authentication only — no analytics or tracking.
