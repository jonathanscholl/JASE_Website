import express from "express";
import morgan from "morgan";
import { supabase } from "./lib/supabase.js";

import { readFileSync } from 'fs';
import path from 'path';


import dotenv from 'dotenv';
dotenv.config();



// Use an absolute path
const ratings = JSON.parse(readFileSync(path.join(process.cwd(), 'public/data/ratings.json'), 'utf-8'));
const benefits = JSON.parse(readFileSync(path.join(process.cwd(), 'public/data/benefits.json'), 'utf-8'));



const app = express()


app.use(morgan("tiny"))

app.use(express.static(path.join(process.cwd(), 'public')));


app.use(express.urlencoded({ extended: true }))

app.use('/lib', express.static('lib'));


app.set('views', path.join(process.cwd(), 'netlify/functions/views'));
app.set('view engine', 'ejs')


if (process.env.NODE_ENV !== 'production') {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log("Server started on port", PORT);
  });
}

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
    console.log('Contact form submission: ', request.body.Name)
    const name = request.body.Name
    const template_message = `Thank you for your message ${name}.`
    response.render('template', {template_message: template_message})
  })


  app.get('/challenges', (request, response) => {

    response.redirect('/#challenges')
  })


  app.get('/download', (request, response) => {

    response.render('download')
  })


  
  app.get('/get-challenge', async (request, response) => {
    try {

      const challenge_nr = Math.floor(Math.random() * 150) + 1
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


  app.get('*', (request, response) => {


    const url = request.url
    const template_message = ` Error 404: The url  "${url}" could not be found.`
    response.render('template', {template_message: template_message} )
  })



  


export default app