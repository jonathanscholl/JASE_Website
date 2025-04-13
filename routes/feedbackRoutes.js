import express from "express";

import { showFeedback, postFeedback, upvoteFeedback, handleDeleteFeedback } from "../controllers/feedbackController";



const router = express.Router();

router.get('/', showFeedback);

router.post('/', postFeedback);

router.post('/upvote', upvoteFeedback);

router.post('/delete', handleDeleteFeedback);


export default router;

