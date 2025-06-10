import {
    supabaseLogin,
    supabaseLogout,
    supabaseSignup,
    getProfileData,
    addUsernameDB,
    checkIfUsernameAvailable,
  } from "../models/authModel.js";
import { supabase } from "../services/supabase.js";

    export const showLogin = (req, res) => {
    res.render("auth/login");
  };
  
  export const showSignup = (req, res) => {
    res.render("auth/signup");
  };
  
  export const handleLogin = async (req, res) => {
    try {
      const { email, password, redirectToDelete } = req.body;
      const user_id = await supabaseLogin(email, password);
      
      if (!user_id) {
        if (redirectToDelete === 'true') {
          res.render("delete_user", { error: "Invalid credentials. Please try again." });
        } else {
          res.render("auth/login", { error: "Invalid credentials. Please try again." });
        }
        return;
      }

      const profile_data = await getProfileData(user_id);
      
      if (redirectToDelete === 'true') {
        res.redirect(`/delete-user?userId=${user_id}&username=${profile_data.username}`);
        return;
      }
      
      res.render("auth/profile", { profile_data, email, user_id });
    } catch (error) {
      console.error("Login error:", error);
      // Check if redirectToDelete exists in the request body
      const isDeleteRedirect = req.body.redirectToDelete === 'true';
      if (isDeleteRedirect) {
        res.render("delete_user", { error: "An error occurred. Please try again." });
      } else {
        res.render("auth/login", { error: "An error occurred. Please try again." });
      }
    }
  };
  
  export const handleSignup = async (req, res) => {
    try {
      const { email, password, username } = req.body;
      const user_id = await supabaseSignup(email, password);
      res.render("auth/check_email", {username: username, email: email, password: password});
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  export const handleCompleteSignup = async(req, res) => {

    const {email, password, username } = req.body
      const user_id = await supabaseLogin(email, password);
      const isAvailable = await checkIfUsernameAvailable(username);
      if (isAvailable) await addUsernameDB(username, user_id);
      const profile_data = await getProfileData(user_id);
      res.render("auth/profile", { profile_data, email });

  }
  
  export const handleLogout = async (req, res) => {
    try {
      await supabaseLogout();
      res.render("auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  export const showProfile = (req, res) => {
    res.render("auth/profile");
  };
  
  export const handleOAuthCallback = async (req, res) => {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
            const user_id = session.user.id;
            const profile_data = await getProfileData(user_id);
            
            // Check if this is a delete user flow
            const redirectToDelete = req.query.redirectToDelete === 'true';
            
            if (redirectToDelete) {
                if (profile_data) {
                    res.redirect(`/delete-user?userId=${user_id}&username=${profile_data.username}`);
                } else {
                    res.redirect('/delete-user?error=No profile found');
                }
                return;
            }
            
            if (profile_data) {
                res.render("auth/profile", { profile_data, email: session.user.email, user_id });
            } else {
                // If no profile exists, redirect to signup to create one
                res.redirect('/signup');
            }
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error('OAuth callback error:', error);
        res.redirect('/login');
    }
  };
  
  export const handleAppleSignIn = async (req, res) => {
  try {
    console.log('Redirecting to Supabase Apple OAuth...');

    // Use the Supabase callback URL
    const redirectTo = encodeURIComponent('https://opjhhvadureyhyfyignl.supabase.co/auth/v1/callback');

    const authorizeURL = `https://opjhhvadureyhyfyignl.supabase.co/auth/v1/authorize?provider=apple&redirect_to=${redirectTo}`;

    res.redirect(authorizeURL);
  } catch (error) {
    console.error('Apple sign-in redirect error:', error);
    res.render("delete_user", {
      error: "Error signing in with Apple. Please try again.",
    });
  }
};
