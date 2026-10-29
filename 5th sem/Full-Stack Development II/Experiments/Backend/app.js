const express = require('express');

const app = express();

app.use(express.json());

let users = ['Rajesh' , 'Saurav' , 'Niraj' , 'Dipson'];

app.post('/user',(req, res)=>{
    const {usr} = req.body;

    if(!user)return res.send('<h1> ')
})