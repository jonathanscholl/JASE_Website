
import { supabase } from "../services/supabase.js";


export const getFeedback = async() => {


    const { data, error } = await supabase

    .from("feedback")
    .select("id, message, votes, profile_id")
    .order('votes', { ascending: false })


    if (error) {

        console.log(error)
        return response.status(401).json({ error: error });
    }

    return data
}


export const updateFeedback = async(message, profile_id) => {

    const {error} = await supabase
    .from("feedback")
    .insert({
      message: message,
      profile_id: profile_id
    })

    if (error) {

        return error
    }


}


export const getFeedbackVotes = async (id) => {

    const { data, error } = await supabase
    .from("feedback")
    .select("votes")
    .eq("id", id)
    .single();

    if (error) {

        console.log(error)
    }

    return data
}


export const updateFeedbackVotes = async (newVotes, id) => {

    const { error } = await supabase
.from("feedback")
.update({ votes: newVotes })
.eq("id", id);

if (error) {


    console.log(error)
}

}


export const deleteFeedback = async (id) => {


    const { data, error } = await supabase
    .from("feedback")
    .delete()
    .eq("id", id)

    if (error) {

        console.log(error)
    }
}


