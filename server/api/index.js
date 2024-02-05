const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./queries');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors({
    credentials: true,
    origin: 'https://localhost:5173'
}))
app.use(express.json());

app.post('/createPost', db.createPost);

app.get('/posts', db.getPosts);

app.get('/singlePost', db.getSinglePost);

app.post('/createComment', db.createComment);

app.get('/getComments', db.getComments);

app.listen(4000);