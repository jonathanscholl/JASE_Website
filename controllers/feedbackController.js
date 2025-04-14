import  {getFeedback, updateFeedback, getFeedbackVotes, updateFeedbackVotes, deleteFeedback } from "../models/feedbackModel.js"



export const showFeedback = async (req, res) => {

    try {
        const data = await getFeedback()
        res.render("feedback", {feedback: data})
      } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}

export const postFeedback = async (req, res) => {

    try {
        const message = req.body.text
        const profile_id = req.body.profile_id

        console.log("Profile_ID: ", profile_id)

        if (profile_id === "empty") {

          res.render("auth/login")
          return
        }


        const error = await updateFeedback(message, profile_id)

        if (error) {

          console.log(error)
        }

        res.redirect("feedback")


    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



export const upvoteFeedback = async (req, res) => {
    try {
        const { id } = req.body;
  
        const data = await getFeedbackVotes(id)
  
        const newVotes = data.votes + 1;

        await updateFeedbackVotes(newVotes, id)
  
        res.json({ success: true, newVotes });

    } catch (error) {
        console.error('Error upvoting feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const handleDeleteFeedback = async (req, res) => {

    try {
        const { id } = req.body;
        
        await deleteFeedback(id)
  
  
        res.json({ success: true });
    } catch (error) {
        console.error('Error upvoting feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



