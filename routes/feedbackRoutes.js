import express from "express";

import { showFeedback, postFeedback, upvoteFeedback, handleDeleteFeedback } from "../controllers/feedbackController.js"



const feedbackRouter = express.Router();

feedbackRouter.get('/', showFeedback);

feedbackRouter.post('/', postFeedback);

feedbackRouter.post('/upvote', upvoteFeedback);

feedbackRouter.post('/delete', handleDeleteFeedback);


export default feedbackRouter;

