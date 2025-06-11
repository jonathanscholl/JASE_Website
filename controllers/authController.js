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
    const code = req.query.code;
    const next = req.query.next ?? "/";
    const error = req.query.error;
    const errorDescription = req.query.error_description;

    if (error) {
      console.error('OAuth error:', error, errorDescription);
      return res.redirect('/?error=' + encodeURIComponent(errorDescription));
    }

    if (code) {
      try {
        const supabase = createServerClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_ANON_KEY,
          {
            cookies: {
              get(name) {
                return req.cookies[name];
              },
              set(name, value, options) {
                res.cookie(name, value, options);
              },
              remove(name, options) {
                res.cookie(name, '', { ...options, maxAge: 0 });
              },
            },
          }
        );

        await supabase.auth.exchangeCodeForSession(code);
        return res.redirect(303, `/${next.slice(1)}`);
      } catch (error) {
        console.error('Error exchanging code for session:', error);
        return res.redirect('/?error=' + encodeURIComponent('Failed to authenticate'));
      }
    }

    return res.redirect('/');
  };
  
  export const handleAppleSignIn = async (req, res) => {
    try {
      const redirectToDelete = req.body.redirectToDelete === 'true';
      const redirectUrl = redirectToDelete 
        ? 'https://playjase.com/auth/callback?next=/delete-user'
        : 'https://playjase.com/auth/callback';

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            response_mode: 'form_post'
          }
        }
      });

      if (error) {
        console.error('Apple sign-in error:', error);
        return res.render("delete_user", { 
          error: "Error signing in with Apple. Please try again." 
        });
      }

      if (data?.url) {
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
