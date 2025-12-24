# Care.IO 🏥

A comprehensive web platform for booking care services, including Baby Sitting, Elderly Care, and Sick People Services. Built with Next.js, TailwindCSS, and MongoDB.

## ✨ Key Features

- **Responsive Design**: Fully responsive UI for mobile, tablet, and desktop using DaisyUI & TailwindCSS.
- **Authentication**: Secure login via **Google** and **Email/Password** (NextAuth.js).
- **Service Booking**:
  - Dynamic costs based on duration.
  - Granular location selection (Division > District > City > Area).
  - Date picking and address inputs.
- **User Dashboard**:
  - View active/past bookings.
  - **Cancel** pending bookings.
  - Profile overview.
- **Admin Dashboard**:
  - View total revenue, users, and booking stats.
  - Payment/Booking history.
- **Notifications**: Automatic **Email Invoices** sent upon successful booking (`nodemailer`).
- **SEO Optimized**: Dynamic metadata and semantic HTML structure.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **Database**: MongoDB (via `mongodb` driver)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Email**: Nodemailer

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Database (Atlas or Local)
- Google Cloud Console Project (for OAuth)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/care.io.git
    cd care.io
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root directory (or use the existing one if provided) and add:

    ```env
    # Database
    MONGODB_URI=your_mongodb_connection_string
    DB_NAME=care-io

    # Auth (NextAuth)
    NEXTAUTH_SECRET=your_random_secret_string
    NEXTAUTH_URL=http://localhost:3000

    # Google OAuth
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

    # Email (Nodemailer)
    EMAIL_HOST=smtp.gmail.com
    EMAIL_PORT=587
    EMAIL_SECURE=false
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_password
    EMAIL_FROM="Care.IO <no-reply@care.io>"
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📦 Deployment

### Deploying to Vercel

1.  Push your code to a GitHub repository.
2.  Import the project in [Vercel](https://vercel.com/new).
3.  **Environment Variables**: extensive logic logic logic for NextAuth to work in production, ensure you add all variables from your `.env` to the Vercel Project Settings.
    - Set `NEXTAUTH_URL` to your production domain (e.g., `https://care-io.vercel.app`).
4.  Deploy!

> **Note**: The project is configured with `export const dynamic = 'force-dynamic'` in `layout.jsx` to ensure server-side features (like Auth) work correctly in Vercel's serverless environment.

## 📂 Project Structure

- `src/app`: App Router pages and layouts.
- `src/actions`: Server Actions for Bookings, Auth, and Services.
- `src/components`: Reusable UI components (Navbar, Forms, Cards).
- `src/lib`: Utilities (DB Connect, Auth Options, Email).
- `src/data`: Static JSON data (Service Centers).
