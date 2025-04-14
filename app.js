import express from "express";
import morgan from "morgan";
import { readFileSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js"
import generalRoutes from "./routes/generalRoutes.js"


export const ratings = JSON.parse(readFileSync(path.join(process.cwd(), 'public/data/ratings.json'), 'utf-8'));
export const benefits = JSON.parse(readFileSync(path.join(process.cwd(), 'public/data/benefits.json'), 'utf-8'));


const app = express()


app.use(morgan("tiny"))

app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.set('views', path.join(process.cwd(), 'netlify/functions/views'));
app.set('view engine', 'ejs')



app.use("/", authRoutes);

app.use("/feedback", feedbackRoutes);

app.use("/", generalRoutes);


  app.get('*', (request, response) => {


    const url = request.url
    const template_message = ` Error 404: The url  "${url}" could not be found.`
    response.render('template', {template_message: template_message} )
  })


export default app