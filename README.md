# JASE: IRL Challenges App - Website

This is the official Website for the mobile App "Jase: IRL Challenges App" and my final hand in for SE_19: Web Development Basics

🌐 **Live Site**: [playjase.com](https://playjase.com)

---

## 📌 Features

- Landingpage with demo of the app, benefits of the app, how it works and feedback from users
- User authentication and session management  
- Interactive user interface with responsive design  
- Server-side rendering using EJS templates  
- Integration with Supabase for database and authentication functionalities  
- Deployment configured for Netlify (main branch) / Render (render_deployment branch)

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript, EJS  
- **Backend**: Node.js, Express.js  
- **Database**: Supabase  
- **Deployment**: Netlify / Render

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jonathanscholl/JASE_Website.git
   cd JASE_Website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add Supabase credentials:

   ```env
   SUPABASE_URL=supabase_url
   SUPABASE_KEY=supabase_key
   ```

4. Start the Netlify development server:

   ```bash
   netlify dev
   ```

   The application will be running at `http://localhost:8888`.

5. Alternative: 

    5.1 Change to render deployment branch:

   ```bash
   git checkout render_deployment
    ```

    5.2 Start local development server:

   ```bash
   git checkout render_deployment
    ```


---

## 📁 Project Structure

```
JASE_Website/
├── controllers/        # Route handlers
├── models/             # Data layer communicaton
├── netlify/functions/  # Serverless functions for Netlify
    ├── views/              # EJS templates
├── public/             # Static assets (CSS, JS, images)
├── routes/             # Express route definitions
├── services/           # External service integrations (supabase)
├── supabase/           # Supabase utilities
├── app.js              # Main application file
├── package.json        # Project metadata and scripts
└── netlify.toml        # Netlify deployment configuration
```
