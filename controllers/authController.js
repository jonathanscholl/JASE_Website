import {
    supabaseLogin,
    supabaseLogout,
    supabaseSignup,
    getProfileData,
    addUsernameDB,
    checkIfUsernameAvailable,
  } from "../models/authModel.js";
import { supabase } from "../services/supabase.js";
import { createServerClient } from '@supabase/ssr';

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
    console.log('OAuth callback received');
    const { code, state, error: oauthError, error_description } = req.query;
    
    // Decode and verify state
    let stateData;
    try {
      stateData = JSON.parse(Buffer.from(state, 'base64').toString());
      // Verify state is not too old (e.g., 15 minutes)
      if (Date.now() - stateData.timestamp > 15 * 60 * 1000) {
        throw new Error('State expired');
      }
    } catch (error) {
      console.error('Invalid state:', error);
      return res.redirect('/?error=' + encodeURIComponent('Invalid authentication state'));
    }

    if (oauthError) {
      console.error('OAuth error:', oauthError, error_description);
      return res.redirect('/?error=' + encodeURIComponent(error_description));
    }

    if (code) {
      try {
        // Exchange the code for a session
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        
        if (exchangeError) {
          console.error('Error exchanging code:', exchangeError);
          return res.redirect('/?error=' + encodeURIComponent('Authentication failed. Please try again.'));
        }

        if (data?.user) {
          // Handle redirect based on state data
          if (stateData.redirectToDelete) {
            return res.redirect(`/delete-user?userId=${data.user.id}&username=${data.user.user_metadata?.username || 'User'}`);
          }
          
          return res.redirect('/');
        } else {
          console.error('No user data received after code exchange');
          return res.redirect('/?error=' + encodeURIComponent('Authentication failed. Please try again.'));
        }
      } catch (error) {
        console.error('Error in OAuth callback:', error);
        return res.redirect('/?error=' + encodeURIComponent('An unexpected error occurred. Please try again.'));
      }
    }

    return res.redirect('/');
  };
  
  export const handleAppleSignIn = async (req, res) => {
    try {
      const redirectToDelete = req.body.redirectToDelete === 'true';
      const redirectUrl = 'https://playjase.com/auth/callback';
      
      // Generate a random state and encode the redirect information
      const state = Buffer.from(JSON.stringify({
        redirectToDelete,
        timestamp: Date.now()
      })).toString('base64');

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            response_type: 'code',
            state: state
          },
          skipBrowserRedirect: false
        }
      });

      if (error) {
        console.error('Apple sign-in error:', error);
        return res.render("delete_user", { 
          error: "Error signing in with Apple. Please try again." 
        });
      }

      if (data?.url) {
        console.log('Redirecting to Apple auth URL:', data.url);
        return res.redirect(data.url);
      } else {
        console.error('No URL returned from Apple sign-in');
        return res.render("delete_user", { 
          error: "Error signing in with Apple. Please try again." 
        });
      }
    } catch (error) {
      console.error('Apple sign-in error:', error);
      return res.render("delete_user", { 
        error: "An unexpected error occurred. Please try again." 
      });
    }
  };
