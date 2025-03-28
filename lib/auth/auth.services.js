import { supabase } from "../supabase.js";

export const supabaseLogin = async(email, password) => {

    console.log(`Login attempt for: ${email}`);

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    
    if (error) {
        console.error('Login error:', error);
        return response.status(401).json({ error: 'Invalid credentials' });
    }
    
    console.log("Login successful:", data);

    return data.user.id
}

export const supabaseSignup = async(email, password) => {

    console.log(`Signup attempt for: ${email}`);

    const { data, error } = await supabase.auth.signUp({ //JS: login using supabases authentication
        email,
        password,
      });
    
    if (error) {
        console.error('Signup error:', error);
        return response.status(401).json({ error: 'Invalid credentials' });
    }
    
    console.log("Login successful:", data);

    return data.user.id
}






export const getProfileData = async (user_id) => {

    const { data: profile_data, error: profile_error } = await supabase

    .from("profiles")
    .select("*")
    .eq("user_id", user_id)
    .single();

    return profile_data
}

