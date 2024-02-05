const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./queries');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json());

app.post('/api/createPost', db.createPost);

app.get('/api/posts', db.getPosts);

app.get('/api/singlePost', db.getSinglePost);

app.post('/api/createComment', db.createComment);

app.get('/api/getComments', db.getComments);

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}.`);
});