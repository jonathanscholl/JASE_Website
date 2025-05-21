import { supabase } from "../services/supabase.js";


export const fetchChallenge = async(challenge_nr) => {

    const { data, error } = await supabase
    .from("challenges")
    .select("name, description")
    .eq("challenge_nr", challenge_nr)
    .limit(1)
    .single();

    if (error) {

        console.log(error)
    }

  return data
}
export const insertExpoSignup = async(data) => {

    const {error} = await supabase
    .from("expo_signup")
    .insert({
      surname: data.surname,
      name: data.name,
      email: data.email,
      joining: data.joining,
      team: data.team,
      teammates: data.teammates,
      operating_system: data.operating_system,
      consent: data.consent
    })
    
    if (error) {
    
      console.log(error)
    }
}

export const fetchNews = async () => {

    const { data, error } = await supabase
    .from("news")
    .select("*")
    .limit(4)

    if (error) {

        console.log(error)
    }

    return data
}

export const fetchEvidenceWithDetails = async () => {
    const { data, error } = await supabase
        .from("evidence")
        .select(`
            *,
            team_challenges!inner (
                challenge_id,
                challenges (
                    name
                )
            ),
            teams:team_id (*)
        `)

    console.log(data)

    if (error) {
        console.log(error);
        return null;
    }

    return data;
}

