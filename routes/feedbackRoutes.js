import express from "express";

import { supabase } from "../services/supabase";


const router = express.Router();

router.get('/feedback', async (request, response) => {
    try {


      const { data, error } = await supabase
        .from("feedback")
        .select("id, message, votes, profile_id")
        .order('votes', { ascending: false })

        console.log(data)



      if (error) throw error;


      console.log(data)
      response.render("feedback", {feedback: data})
    } catch (error) {
      console.error('Error fetching feedback:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/feedback', async (request, response) => {
    try {
        const message = request.body.text
        const profile_id = request.body.profile_id

        console.log("Profile_ID: ", profile_id)

        if (profile_id === "empty") {

          response.render("auth/login")
          return
        }

        const {data, error} = await supabase
        .from("feedback")
        .insert({
          message: message,
          profile_id: profile_id
        })

        if (error) {

          console.log(error)
        }

        response.redirect("feedback")


    } catch (error) {
        console.error('Unexpected error:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/feedback/upvote', async (request, response) => {
  try {
      const { id } = request.body;


      const { data, error } = await supabase
          .from("feedback")
          .select("votes")
          .eq("id", id)
          .single();

      if (error) throw error;


      const newVotes = data.votes + 1;

      
      const { error: updateError } = await supabase
          .from("feedback")
          .update({ votes: newVotes })
          .eq("id", id);

      if (updateError) throw updateError;

      response.json({ success: true, newVotes });
  } catch (error) {
      console.error('Error upvoting feedback:', error);
      response.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/feedback/delete', async (request, response) => {
  try {
      const { id } = request.body;


      const { data, error } = await supabase
          .from("feedback")
          .delete()
          .eq("id", id)


      if (error) throw error;

      response.json({ success: true });
  } catch (error) {
      console.error('Error upvoting feedback:', error);
      response.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;

