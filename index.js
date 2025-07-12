const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()
const app = express()
const port = 3000
const { readUsers, writeUsers } = require('./filehelpers')
const {authmw} = require('./authmw.js')

app.use(express.json())

// user registration route
app.post('/register', async (req, res)=>{
    const { username, password } = req.body;

    if(!username||!password){
        res.status(400).json({message:"missing fields for registration"})
    };

    const hashedpass = await bcrypt.hash(password, 10)

    const users = await readUsers();

    const user = users.find(u => u.username === username);

    if(user) {
        res.status(400).json({message:"user with the same username exists"});
    };
    users.push({username, password:hashedpass, token:null});
    writeUsers(users);
    
    res.status(201).json({message:"user registered successfully"})
});

// user login route 
app.post('/login', async(req, res)=>{
    const { username, password } = req.body;

    if(!username||!password){
        res.status(400).json({message:"missing fields for registration"})
    };

    const users = await readUsers();

    const user = users.find(u=> u.username === username);
    if(!user){
        res.status(401).json({message:"user not found"})
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if(!ismatch){
        res.status(401).json({message:"wrong password"});
    };

    const token = jwt.sign(
        {username: user.username}, //payload
        process.env.secret //key
    );
    
    res.status(200).json({message:"login successful", token:token});

});

// to post a message 
app.post('/posts/new', authmw, (req, res)=>{
    const user = req.user;
    const content = req.body.content;

    if(!user) return res.status(400).json({message:"missing fields: user not found"})

    const users = readUsers();

    const reqUser = users.find(u => u.username === user.username);

    if(!reqUser) return res.status(404).json({message:"user not found"})

    if(!reqUser.message){
        reqUser.message = []
    }

    reqUser.message.push(content)

    writeUsers(users)

    res.status(201).json({message:"post added successfully"})
});


// fallback route 
app.use((req,res)=>{
    res.status(404).json({message:"not found"})
})
app.listen(port, ()=>{
    console.log(`we ballin at port ${port}`)
})