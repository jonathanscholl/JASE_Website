import express from "express";
import morgan from "morgan";

import data from "./data.json" with { type: "json" };


const app = express()
const PORT = 3000


app.use(morgan("tiny"))

app.use('/public', express.static('public'))

app.use(express.urlencoded({ extended: true }))

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



  app.get('*', (request, response) => {

    const url = request.url
    const template_message = ` Error 404: The url  "${url}" could not be found.`
    response.render('template', {template_message: template_message} )
  })


  


