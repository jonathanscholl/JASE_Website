import { supabase } from "../services/supabase.js";

export const supabaseLogin = async(email, password) => {
    console.log(`Login attempt for: ${email}`);

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    
    if (error) {
        console.error('Login error:', error);
        return null;
    }
    
    console.log("Login successful:", data);
    return data.user.id;
}

export const supabaseSignup = async(email, password) => {

    console.log(`Signup attempt for: ${email}`);

    const { data, error } = await supabase.auth.signUp({ 
        email,
        password,
      });
    
    if (error) {
        console.error('Signup error:', error);
        return response.status(401).json({ error: 'Invalid credentials' });
    }
    
    console.log("Signup successful:", data);

    return data.user.id
}

export const supabaseLogout = async () => {
  const { error:logOutError } = await supabase.auth.signOut();
  if (logOutError) {
    console.log("logOutError: ",logOutError);
  }
};


export const checkIfUsernameAvailable = async (username) => {
    try {
      const { data, error } = await supabase.from("profiles").select("username");
      if (error) {
        throw new Error(error.message);
      }
      const usernames = data.map((user) => user.username);
      return !usernames.includes(username);
    } catch (error) {
      console.log("usernameGenerationError: ",error);
      return false;
    }
  };


  export const addUsernameDB = async (username, user_id) => {
    const time = new Date();

  
    const { error:addUsernameDBError } = await supabase.from("profiles").insert({
      username,
      user_id: user_id,
      created_at: time,
      games_played: 0,
      games_won: 0,
    });
  
    if (addUsernameDBError) {
  
      console.log("addUsernameDBError: ",addUsernameDBError)
    }
  };






export const getProfileData = async (user_id) => {

    const { data: profile_data, error: profile_error } = await supabase

    .from("profiles")
    .select("*")
    .eq("user_id", user_id)
    .single();

    return profile_data
}


export const getUserId = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw new Error(error.message);
    }
    return data.session?.user;
  };


