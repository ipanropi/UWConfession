const express = require('express');
const app = express();
require('dotenv').config({ path: require('find-config')('.env') })
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./queries');


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(express.json());

app.post('/api/createPost', db.createPost);

app.get('/api/posts', db.getPosts);

app.get('/api/singlePost', db.getSinglePost);

app.post('/api/createComment', db.createComment);

app.get('/api/getComments', db.getComments);

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}.`);
    console.log(process.env.CLIENT_URL)
});
