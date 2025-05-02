import { insertExpoSignup, fetchChallenge, fetchNews } from "../models/generalModel.js";
import { ratings, benefits } from "../app.js";


export const showIndex = (req, res) => {

    const ratingsData = ratings.ratings
    const benefitsData = benefits.benefits
  
  
    res.render('index', {
        ratings: ratingsData,
        benefits: benefitsData

  });
}

export const getChallenge = async(req, res) => {


        try {
    
          const challenge_nr = Math.floor(Math.random() * 200) + 1
          const challenge_data  = await fetchChallenge(challenge_nr)
   
      
          res.json(challenge_data);
        } catch (error) {
          console.error('Error fetching challenge:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }


  
export const showContact = (req, res) => {
    res.render("contact");
  };

  export const showDownload = (req, res) => {
    res.render("download");
  };

  export const showPrivacyPolicy = (req, res) => {
    res.render("privacy_policy");
  };

  export const showEmailConfirmed = (req, res) => {

    const template_message = `Your email confirmation is completed! You can now continue`
    res.render('template', {template_message: template_message} )
  }

  export const showNews = (req, res) => {


    res.render('news')
  }

  export const getNews = async(req, res) => {

    try {

          const news_data = await fetchNews()
  
        res.json(news_data);
      } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }

  export const showExpoSignup = (req, res) => {

    res.render("expo_signup")
  }



  export const postExpoSignup = async(req, res) => {


        const insert_data = req.body

        console.log(insert_data)

         await insertExpoSignup(insert_data)

        const template_message = `Thank you ${req.body.surname} for signing up to expo day. We can't wait to test our game with you`
        res.render('template', {template_message: template_message})


      }






