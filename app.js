import express from "express";
import morgan from "morgan";
import { supabase } from "./lib/supabase.js";

import dotenv from 'dotenv';
dotenv.config();


const app = express()
const PORT = 3000


app.use(morgan("tiny"))

app.use('/public', express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use('/lib', express.static('lib'));


app.set('view engine', 'ejs')



app.listen(PORT,() => {

    console.log("Server started")
})

app.get('/', (request, response) => {
    response.render('index')
  })

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

    response.render('challenges')
  })


  app.get('/download', (request, response) => {

    response.render('download')
  })


  
  app.get('/get-challenge', async (req, res) => {
    try {

      const challenge_nr = Math.floor(Math.random() * 150) + 1
      const { data, error } = await supabase
        .from("challenges")
        .select("name, description")
        .eq("challenge_nr", challenge_nr)
        .limit(1)
        .single();
  
      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error('Error fetching challenge:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get('*', (request, response) => {


    console.log(request)

    const url = request.url
    const template_message = ` Error 404: The url  "${url}" could not be found.`
    response.render('template', {template_message: template_message} )
  })


  


