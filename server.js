const express = require("express");
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
        /* 
        ssl: {
            rejectUnauthorized: false
        } */
    }
});

const app = express();

app.use(cors());
app.use(express.json());

// --> res = "this is working"
app.get("/", (req, res) => { res.send('it is working!') })

//signin --> POST = success/fail
app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

//register --> POST = user
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })

//profile/:userId --> GET = user
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) })

//image --> PUT --> user
app.put("/image", (req, res) => { image.handleImage(req, res, db) })

app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) })


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

/* const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log(PORT)

//Paste in cmd
//PORT=3000 node server.js */