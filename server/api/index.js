const express = require('express');
const app = express();
require('dotenv').config({path: require('find-config')('.env')})
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./queries');

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(express.json());


app.get('/api/posts', db.getPosts);

app.get('/api/singlePost', db.getSinglePost);

app.get('/api/getComments', db.getComments);

app.get('/api/getPrompt', db.getPrompt);

app.post('/api/submitFeedback', db.submitFeedback);

app.post('/api/submitReport', db.submitReport);

app.post('/api/createPost', db.createPost);

app.post('/api/createComment', db.createComment);

app.post('/api/createMobilePost', db.createMobilePost);

app.post('/api/createMobileComment', db.createMobileComment);

app.put('/api/updatePost', db.updatePost);

app.post('/api/submitMobileFeedback', db.submitMobileFeedback);

app.listen(4000, () => {
    console.log(`App running on port ${4000}.`);
    console.log(process.env.CLIENT_URL)
});
