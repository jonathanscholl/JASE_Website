import express from "express";

import { showIndex, showContact, showDownload, showPrivacyPolicy, showEmailConfirmed, showExpoSignup, postExpoSignup, showNews, getChallenge, getNews} from "../controllers/generalController";



const router = express.Router();


router.get('/', showIndex) 


router.get("/get-challenge", getChallenge)
  

router.get('/contact', showContact );
router.get('/download', showDownload );
router.get('/privacy-policy', showPrivacyPolicy );
router.get('/email-confirmed', showEmailConfirmed );


router.get('/news', showNews)


router.get('/get-news', getNews)


router.get('/expo-signup', showExpoSignup);

router.post('/expo-signup', postExpoSignup)





export default router;

