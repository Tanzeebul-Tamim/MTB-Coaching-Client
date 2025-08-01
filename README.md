<h1 style="display: flex; align-items: center;">
    <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/logo.png" alt="Logo" width="100"/>
    <span>MTB-Coaching - Client End</span>
</h1>

Welcome to the client-side repository of the **_Professional Mountain Biking Coaching Network_** website. This platform is dedicated to connecting aspiring mountain bikers with professional instructors, offering a comprehensive range of courses and resources to enhance their skills.

<br>

<p align="center">
   <img src="https://raw.githubusercontent.com/Tanzeebul-Tamim/MTB-Coaching-Client/refs/heads/assets/doc/banner.png" alt="Banner" />
</p>

<br>

## 📚 Table of Contents

-   [🧰 Packages & Technologies Used](#-packages--technologies-used)
-   [📁 Project Structure](#-project-structure)
-   [🚀 Website Features](#-website-features)
-   [✅ Prerequisites](#-prerequisites)
-   [🔧 Installation, Configuration & Running Locally](#-installation-configuration--running-locally)
-   [🔑 Demo Access & Credentials](#-demo-access--credentials)
-   [💳 Test Payment Info (Stripe)](#-test-payment-info-stripe)
-   [💻 Checkout the Server End](#-checkout-the-server-end)
-   [🌐 Live Deployment](#-live-deployment)
-   [🤝 Contributing](#-contributing)
-   [📄 License](#-license)

<br>

## 🧰 Packages & Technologies Used

<div style="display: flex; gap: 10px; flex-wrap: wrap;">  
   <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
   </a>

   <a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  </a>

  <a href="https://www.npmjs.com/package/react-simple-captcha" target="_blank" rel="noopener noreferrer">
   <img src="https://img.shields.io/badge/React_Simple_Captcha-6B7280?style=for-the-badge&logo=react&logoColor=white" alt="React Simple Captcha" />
   </a>

   <a href="https://react-leaflet.js.org/" target="_blank" rel="noopener noreferrer">
   <img src="https://img.shields.io/badge/React_Leaflet-44A4AE?style=for-the-badge&logo=leaflet&logoColor=white" alt="React Leaflet" />
   </a>

   <a href="https://github.com/timarney/react-youtube" target="_blank" rel="noopener noreferrer">
   <img src="https://img.shields.io/badge/React_Youtube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="React YouTube" />
   </a>

   <a href="https://developers.google.com/youtube/v3" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/YouTube_API-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube API" />
  </a>

   <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">
   <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
   </a>

   <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  </a>

  <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  </a>

  <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </a>

   <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </a>

  <a href="https://daisyui.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/DaisyUI-5C6BC0?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="DaisyUI" />
  </a>     
</div>

<br>

<details>
   <summary>
      <strong>
         Full list of <i>Packages & Technologies Used</i> (Click to expand)
      </strong>
   </summary>

#### **UI & Styling**

-   **React.js**: Core library for building user interfaces
-   **Tailwind CSS**: Utility-first CSS framework
-   **DaisyUI**: Tailwind CSS components
-   **React Icons**: For icons
-   **React Awesome Slider & Swiper**: For creating sliders
-   **React Simple Typewriter**: For typewriter effects
-   **React Awesome Reveal**: For awesome animations
-   **React Credit Cards**: For displaying interactive credit card forms and previews
-   **React Spinners**: For loading spinner components and indicators

#### **Routing & Navigation**

-   **React Router**: For routing and navigation
-   **React Router HashLink**: For smooth anchor navigation to sections within pages

#### **State & Data Handling**

-   **Environment Variables**: For configuration
-   **Moment**: For date manipulation

#### **Authentication & Security**

-   **Firebase**: For authentication
-   **React Simple Captcha**: For adding simple captcha validation to forms

#### **Payments**

-   **Stripe**: For payment processing

#### **Notifications & Alerts**

-   **SweetAlert2**: For beautiful alerts
-   **React Toastify**: For toast notifications

#### **Maps & Media**

-   **React Leaflet**: For interactive maps
-   **YouTube Data API v3**: For fetching and displaying YouTube video data dynamically
-   **React YouTube**: For embedding and controlling YouTube videos in React components

#### **Build & Deployment**

-   **vite-plugin-pwa**: For enabling Progressive Web App (PWA) features and installability
-   **Vercel**: For seamless and fast deployment of the client-side application

</details>

<br>

## 📁 Project Structure

#### Short Overview

```
MTB-Coaching-Client/
├── public/           # Static assets (images, cursors, favicon, etc.)
├── src/
│   ├── api/          # API layer
│   ├── components/   # Reusable UI & layout components
│   ├── pages/        # Page-level views
│   ├── hooks/        # Custom React hooks
│   ├── routes/       # Route configs & guards
│   ├── providers/    # Context providers
│   ├── styles/       # CSS & styling resources
│   └── firebase/     # Firebase config
└── root configs      # ESLint, Tailwind, Vite, PostCSS, Vercel, etc.
```

<br>

<details>

<summary><strong>Detailed <i>Project Structure</i> (Click to expand)</strong></summary>
<br>

```
MTB-Coaching-Client/
├── src/
│   ├── api/                          # API utility functions (authentication, bookings, and general API calls)
│   ├── components/                   # Organized UI components (layout, pages, skeletons, and reusable UI widgets)
│   │   ├── layout/                   # Main UI Components (Navbar, Footer, SideNav, and Leaflet map integrations)
│   │   ├── pages/                    # Error page & No Internet warning page
│   │   ├── skeletons/                # Skeleton loaders for all UI components
│   │   └── ui/                       # Reusable UI components (toggles, pagination, banners, etc.)
│   │
│   ├── firebase/                     # Firebase configuration for auth and services
│   ├── hooks/                        # Custom React hooks (auth, theme, screen size, etc.)
│   ├── layout/                       # Layout components for route structure (Main & Dashboard)
│   ├── pages/                        # All route-level views, grouped by feature/domain
│   │   ├── AboutUs/                  # Static About page content
│   │   ├── AddClass/                 # Instructor class creation form
│   │   ├── Authentication/           # Login, Register, Instructor Register + shared logic
│   │   ├── Classes/                  # Class listings, cards, and filter logic
│   │   ├── EnrolledClass/            # Student's enrolled class dashboard
│   │   ├── Faq/                      # Static or dynamic FAQ section
│   │   ├── Home/                     # Main homepage – banner, testimonials, popular sections
│   │   ├── Instructors/              # Public instructor directory view
│   │   ├── Legal/                    # Privacy policy, terms & conditions
│   │   ├── MyCourses/                # Instructor's own published classes + enrolled students
│   │   ├── MyProfile/                # Profile page with update/edit capability
│   │   ├── PaymentHistory/           # Record of past transactions for users
│   │   ├── SelectedClasses/          # Cart-like system before enrollment
│   │   │   ├── ...                   # Other files and folders
│   │   │   └── PaymentConfirmation/  # Checkout page + Stripe form, success/fail feedback
│   │   └── SingleInstructorsClasses/ # Detail page showing all classes information of a specific instructor
│   │
│   ├── providers/                    # React context providers (auth, screen size & network status)
│   ├── routes/
│   │   ├── config/                   # Route definitions for main and dashboard views (mainRoutes, dashboardRoutes & router)
│   │   ├── guard/                    # Route-level protection for components (private route & role based route protection)
│   │   └── utils/                    # Route-related utilities (scroll behavior and route tracking)
│   │
│   ├── styles/                       # Centralized theme colors for Tailwind and component styling
│   └── App.jsx                       # Root application component
│
├── public/
│   ├── assets/                       # Static assets used in the app
│   ├── cursors/                      # Custom mouse cursor icons used in the app
│   ├── favicon.png                   # Favicon for the website
│   └── manifest.json                 # PWA manifest file defining app metadata (name, icons, theme color, etc.)
│
├── .env.example                      # Sample environment variable file for local development
├── .eslintrc.cjs                     # ESLint configuration
├── .gitignore                        # Git ignored files and folders
├── FEATURES.md                       # Documentation of implemented features
├── index.html                        # Main HTML file served by Vite
├── LICENSE                           # MIT license for open source distribution
├── package.json                      # Project metadata and dependencies
├── package-lock.json                 # Auto-generated lockfile for npm dependencies
├── postcss.config.js                 # PostCSS setup for Tailwind and plugin usage
├── README.md                         # Project documentation (this file)
├── tailwind.config.js                # Tailwind CSS custom configuration
├── vercel.json                       # Vercel rewrites and deployment rules (SPA routing)
└── vite.config.js                    # Vite build and plugin configuration
```

</details>

<br>

## 🚀 Website Features

-   Dynamic and animated home page featuring embedded _YouTube videos_
-   Role-based dashboards tailored for students and instructors
-   Secure authentication with email verification and social login options
-   Smooth and secure payment processing via _Stripe_
-   Real-time image uploads powered by _imgbb_ integration
-   Complete course lifecycle management for instructors and students
-   Dedicated informative pages for _Legal_, _FAQ_, _About Us_, _No Internet_, and custom _404 errors_
-   Fully responsive design optimized for all devices

##### See full breakdown with screenshots ➡️ [FEATURES.md](./FEATURES.md)

<br>

## ✅ Prerequisites

-   [**_Node.js_**](https://nodejs.org/) (v18 or higher recommended)
-   [**_npm_**](https://www.npmjs.com/) (comes with Node.js) (running locally or accessible remotely)
-   A [**_`.env`_**](./.env.example) file with required environment variables  
    _(See the detailed guide in the [**Installation, Configuration & Running Locally**](#-installation-configuration--running-locally) section below)_

<br>

## 🔧 Installation, Configuration & Running Locally

1.  **_Clone the repository:_**

    ```sh
    git clone https://github.com/Tanzeebul-Tamim/MTB-Coaching-Client
    cd MTB-Coaching-Client
    ```

2.  **_Install dependencies:_**

    ```sh
    npm install
    ```

3.  **_Set up Environment Variables:_**

    -   **Rename the `.env.example` file in the project root to `.env`:**

        All the following values can be found in the [`.env.example`](./.env.example) file:

        ```env
        VITE_APIKEY=firebase_api_key
        VITE_AUTHDOMAIN=firebase_auth_domain
        VITE_PROJECTID=firebase_project_id
        VITE_STORAGEBUCKET=firebase_storage_bucket
        VITE_MESSAGINGSENDERID=firebase_messaging_sender_id
        VITE_APPID=firebase_app_id
        VITE_API_URL=backend_api_url
        VITE_IMGBB_API_URL=imgbb_api_url
        VITE_IMGBB_KEY=imgbb_api_key
        VITE_PAYMENT_GATEWAY_PK=stripe_public_key
        VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
        ```

    -   <details>
         <summary><strong>Configuration Details (Click to expand)</strong></summary>

        -   **Firebase Configuration:**

            -   **`VITE_APIKEY`**: Firebase project's API key
            -   **`VITE_AUTHDOMAIN`**: Firebase project's authentication domain
            -   **`VITE_PROJECTID`**: Firebase project ID
            -   **`VITE_STORAGEBUCKET`**: Firebase project's storage bucket
            -   **`VITE_MESSAGINGSENDERID`**: Firebase messaging sender ID
            -   **`VITE_APPID`**: Firebase app ID
                <br>

        -   **imgbb Configuration:**

            -   **`VITE_IMGBB_API_URL`**: The base URL for [**_imgbb_**](https://imgbb.com/) API for image uploads.
            -   **`VITE_IMGBB_KEY`**: [**_imgbb_**](https://imgbb.com/) API key for image uploads.
                <br>

        -   **Backend API URL:**
            **`VITE_API_URL`**: The base URL for backend API (hosted server for this website).
            For more details about the server, see the [**server GitHub repository**](https://github.com/Tanzeebul-Tamim/MTB-Coaching-Server).
            <br>

        -   **STRIPE PUBLIC KEY:**  
             **`VITE_PAYMENT_GATEWAY_PK`**: [**_Stripe_**](https://stripe.com/) public key for payment processing.
            <br>

        -   **VITE_YOUTUBE_API_KEY**:
        **`VITE_YOUTUBE_API_KEY`**: Your Google Cloud YouTube Data API v3 key used to fetch video data dynamically.
        </details>

      <br>

    > ⚠️ **Important Notes:** <br>
    >
    > -   Public keys (_Firebase_, _Stripe_, _imgbb_, etc.) are safe to expose. They’re required for client-side setup and do not pose security risks.
    > -   Unlike some public keys, the YouTube API key should be kept **private and not exposed publicly** in your repository or documentation. <br>
    > -   Make sure to restrict the key in Google Cloud Console to only be used by your app's domain and for the YouTube Data API v3. <br>
    > -   Never commit your actual `.env` file. This file may contain sensitive info and should always be listed in `.gitignore`.

4.  **_Running the Project_**

    ```sh
       npm run dev
    ```

<br>

## 🔑 Demo Access & Credentials

Try out the app with the following demo credentials:

-   **Student Account**

    -   **Email:** `demo.student@example.com`
    -   **Password:** `Demo12345$`

<br>

-   **Instructor Account**

    -   **Email:** `demo.instructor@example.com`
    -   **Password:** `Demo12345$`

<br>

### 💳 Test Payment Info (Stripe)

Use the following **Visa** test card during checkout:

-   **Card Number**: `4242 4242 4242 4242` (Visa)
-   **Expiry:** `1234`
-   **CVC:** `123`
-   **ZIP/Postal:** `12345` or any 5-digit number

<br>


> [!IMPORTANT]
> **Please avoid submitting any sensitive personal information or inappropriate content (e.g., images, names, course titles).**

<br>

> **Note:** <br>
>
> -   This is a demo project. You can explore the app fully using the provided student or instructor credentials.
> -   All users and data are dummy/test entries.
> -   No real transactions occur. Payments are simulated and no real charges are made.
> -   The system is open for demo purposes only.

<br>

## 💻 Checkout the Server End

Visit the [**_server-end repository_**](https://github.com/Tanzeebul-Tamim/MTB-Coaching-Server) of the website.

<br>

## 🌐 Live Deployment

The site is deployed on [**_Vercel_**](https://vercel.com/) and is live at [**this following URL**](https://mtbcoachingnetwork.vercel.app/).

<br>

## 🤝 Contributing

Have ideas to improve this platform? Found a bug?
Let’s make it better together! [Open an issue](https://github.com/Tanzeebul-Tamim/MTB-Coaching-Client/issues) or submit a pull request.

<br>

## 📄 License

This project is licensed under the **_MIT License_** - see the [**LICENSE**](LICENSE) file for details.
