import express from "express";
import morgan from "morgan";
import { supabase } from "./lib/supabase.js";
import { addUsernameDB, checkIfUsernameAvailable, getProfileData, supabaseLogin, supabaseSignup } from "./lib/auth/auth.services.js";

import { readFileSync } from 'fs';
import path from 'path';


import dotenv from 'dotenv';
dotenv.config();



// Use an absolute path
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


// if (process.env.NODE_ENV !== 'production') {
//   const PORT = 3000;
//   app.listen(PORT, () => {
//     console.log("Server started on port", PORT);
//   });
// }

app.get('/', (request, response) => {

  const ratingsData = ratings.ratings
  const benefitsData = benefits.benefits


  response.render('index', {
      ratings: ratingsData,
      benefits: benefitsData
  });
});

  app.get('/about', (request, response) => {
    response.render('about')
  })

  app.get('/contact', (request, response) => {
    response.render('contact')
  })


  app.post('/contact', (request, response) => {
    console.log('Contact form submission: ', request.body.name)
    const name = request.body.Name
    const template_message = `Thank you for your message ${name}. Your opinion matters a lot to us`
    response.render('template', {template_message: template_message})
  })


  app.get('/challenges', (request, response) => {

    response.redirect('/#challenges')
  })


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

  

  app.post('/login', async (request, response) => {
    try {
        const email = request.body.email
        const password = request.body.password

        const user_id = await supabaseLogin(email, password)

        const profile_data = await getProfileData(user_id)


        response.render('auth/profile', {username: profile_data.username, email: email, pb_path: profile_data.pb_path, games_played: profile_data.games_played, games_won: profile_data.games_won})

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


      response.render('auth/profile', {username: profile_data.username, email: email, pb_path: profile_data.pb_path, games_played: profile_data.games_played, games_won: profile_data.games_won})

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