const dotenv = require('dotenv');

// get config vars
dotenv.config();


const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const createPost = async (request, response) => {
    const { title, content } = request.body;
    pool.query('INSERT INTO posts (title, content) VALUES ($1, $2)', [title, content], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Post added!`);
    })
}

const getPosts = async (request, response) => {
    pool.query('SELECT post_id, title, content, to_char(created_at, \'Month DD, YYYY\') FROM posts ORDER BY post_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSinglePost = async (request, response) => {
    pool.query('SELECT post_id, title, content, to_char(created_at, \'Month DD, YYYY\') FROM posts WHERE post_id = $1', [request.query.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}

const createComment = async (request, response) => {

    pool.query('INSERT INTO comments (post_id, content) VALUES ($1, $2)', [request.body.post_id, request.body.content], (error, results) => {
        if (error) {
            throw error
        }

        response.status(201).send(`Comment added!`);
    })
}

const getComments = async (request, response) => {
    console.log(request.query.id);

    pool.query('SELECT comment_id, content, to_char(created_at, \'Month DD, YYYY\') FROM comments WHERE post_id = $1', [request.query.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(results.rows);
    })
}


module.exports = {
    createPost,
    getPosts,
    getSinglePost,
    createComment,
    getComments
}