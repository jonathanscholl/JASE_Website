import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import morgan from "morgan";
import { readFileSync } from 'fs';
import path from 'path';
import session from 'express-session';

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

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));


app.set('views', path.join(process.cwd(), 'netlify/functions/views'));
app.set('view engine', 'ejs')



app.use("/", authRoutes);

app.use("/feedback", feedbackRoutes);

app.use("/", generalRoutes);


  app.get('*', (req, res) => {


    const url = req.url
    const template_message = ` Error 404: The url  "${url}" could not be found.`
    res.render('template', {template_message: template_message} )
  })


export default app