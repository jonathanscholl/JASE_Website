import express from "express";
import morgan from "morgan";
import { supabase } from "./services/supabase.js";
import { addUsernameDB, checkIfUsernameAvailable, getProfileData, getUserId, supabaseLogin, supabaseLogout, supabaseSignup } from "./models/authModel.js";

import { readFileSync } from 'fs';
import path from 'path';


import dotenv from 'dotenv';
dotenv.config();




const ratings = JSON.parse(readFileSync(path.join(process.cwd(), 'public/data/ratings.json'), 'utf-8'));
const benefits = JSON.parse(readFileSync(path.join(process.cwd(), 'public/data/benefits.json'), 'utf-8'));



const app = express()


app.use(morgan("tiny"))

app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(express.static('lib'));


app.set('views', path.join(process.cwd(), 'netlify/functions/views'));
app.set('view engine', 'ejs')



app.get('/', (request, response) => {

  const ratingsData = ratings.ratings
  const benefitsData = benefits.benefits


  response.render('index', {
      ratings: ratingsData,
      benefits: benefitsData
  });
});


  app.get('/contact', (request, response) => {
    response.render('contact')
  })


  app.get('/expo-signup', (request, response) => {
    response.render('expo_signup')
  })

  app.post('/expo-signup', async(request, response) => {
    console.log(request.body)


    const {data, error} = await supabase
    .from("expo_signup")
    .insert({
      surname: request.body.surname,
      name: request.body.name,
      email: request.body.email,
      joining: request.body.joining,
      team: request.body.team,
      teammates: request.body.teammates,
      operating_system: request.body.operating_system,
      consent: request.body.consent
    })

    if (error) {

      console.log(error)
    }
    const template_message = `Thank you ${request.body.surname} for signing up to expo day. We can't wait to test our game with you`
    response.render('template', {template_message: template_message})
  })

  app.post('/contact', (request, response) => {

    console.log(request.body)
    const name = request.body.Name
    const template_message = `Thank you for your message ${name}. Your opinion matters a lot to us`
    response.render('template', {template_message: template_message})
  })

  app.get('/feedback', async (request, response) => {
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

  app.post('/feedback', async (request, response) => {
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

app.post('/feedback/upvote', async (request, response) => {
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


app.post('/feedback/delete', async (request, response) => {
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


  




  app.get('/download', (request, response) => {

    response.render('download')
  })


  app.get('/news', (request, response) => {

    response.render('news')
  })

  app.get('/login', (request, response) => {

    response.render('auth/login')
  })

  app.get('/signup', (request, response) => {

    response.render('auth/signup')
  })

  app.get('/profile', async(request, response) => {

    response.render('auth/profile')
  })

  app.get('/privacy-policy', (request, response) => {

    response.render('privacy_policy')
  })

  app.get('/email-confirmed', (request, response) => {


    const template_message = `Your email confirmation is completed! You can now return to the app`
    response.render('template', {template_message: template_message} )
  })

  


  app.post('/login', async (request, response) => {
    try {
        const email = request.body.email
        const password = request.body.password

        const user_id = await supabaseLogin(email, password)

        const profile_data = await getProfileData(user_id)


        response.render('auth/profile', {profile_data: profile_data, email: email})

    } catch (error) {
        console.error('Unexpected error:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/signup', async (request, response) => {
  try {
      const email = request.body.email
      const password = request.body.password
      const username = request.body.username

      const user_id = await supabaseSignup(email, password)


      const isAvailable = await checkIfUsernameAvailable(username)

      if (isAvailable) {

        await addUsernameDB(username, user_id)
      }

      const profile_data = await getProfileData(user_id)


      response.render('auth/profile', {profile_data: profile_data, email: email})

  } catch (error) {
      console.error('Unexpected error:', error);
      response.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/logout', async (request, response) => {
  try {
      

      await supabaseLogout()

      response.render('auth/login')

  } catch (error) {
      console.error('Unexpected error:', error);
      response.status(500).json({ error: 'Internal server error' });
  }
});


  
  app.get('/get-challenge', async (request, response) => {
    try {

      const challenge_nr = Math.floor(Math.random() * 100) + 1
      const { data, error } = await supabase
        .from("challenges")
        .select("name, description")
        .eq("challenge_nr", challenge_nr)
        .limit(1)
        .single();
  
      if (error) throw error;
      response.json(data);
    } catch (error) {
      console.error('Error fetching challenge:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get('/get-news', async (request, response) => {
    try {

      const { data, error } = await supabase
        .from("news")
        .select("*")
        .limit(4)

  
      if (error) throw error;
      response.json(data);
    } catch (error) {
      console.error('Error fetching news:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });



  app.get('*', (request, response) => {


    const url = request.url
    const template_message = ` Error 404: The url  "${url}" could not be found.`
    response.render('template', {template_message: template_message} )
  })



  


export default app