import express from "express";

import { showIndex, showContact, showDownload, showPrivacyPolicy, showEmailConfirmed, showExpoSignup, postExpoSignup, showNews, getChallenge, getNews} from "../controllers/generalController.js";



const generalRouter = express.Router();


generalRouter.get('/', showIndex) 


generalRouter.get("/get-challenge", getChallenge)
  

generalRouter.get('/contact', showContact );
generalRouter.get('/download', showDownload );
generalRouter.get('/privacy-policy', showPrivacyPolicy );
generalRouter.get('/email-confirmed', showEmailConfirmed );


generalRouter.get('/news', showNews)


generalRouter.get('/get-news', getNews)


generalRouter.get('/expo-signup', showExpoSignup);

generalRouter.post('/expo-signup', postExpoSignup)



export default generalRouter;

