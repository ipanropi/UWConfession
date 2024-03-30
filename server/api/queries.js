const dotenv = require('dotenv');
const axios = require('axios');

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
    const { title, content, honeypot, token } = request.body;
    if (honeypot){
        response.status(403).send('Honeypot filled');
        return
    }

    const captchaResponse = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        new URLSearchParams({
            secret: process.env.SECRET_KEY, // Again, ensure this is the secret key
            response: token
        }).toString(),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );




    if(captchaResponse.data.success && captchaResponse.data.score > 0.5) {
        pool.query('INSERT INTO posts (title, content) VALUES ($1, $2)', [title, content], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Post added!`);
        })
    } else {
        response.status(403).send('Invalid reCAPTCHA. Please try again.');
    }
}

const getPosts = async (request, response) => {
    pool.query('SELECT post_id, title, content, to_char(created_at, \'Month DD, YYYY\'), views FROM posts ORDER BY created_at DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updatePost = async (request, response) => {
    console.log(`request.query.id: ${request.query.id}`);
    pool.query('UPDATE posts SET views = views + 1 WHERE post_id = $1', [request.query.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(request.query.id);
    })
}

const getSinglePost = async (request, response) => {
    pool.query('SELECT post_id, title, content, to_char(created_at, \'Month DD, YYYY\'), views FROM posts WHERE post_id = $1', [request.query.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}

const createComment = async (request, response) => {
    const { post_id, content, token, honeypot } = request.body;

    if (honeypot){
        response.status(403).send('Honeypot filled');
        return
    }

    const captchaResponse = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        new URLSearchParams({
            secret: process.env.SECRET_KEY, // Again, ensure this is the secret key
            response: token
        }).toString(),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    if (captchaResponse.data.success && captchaResponse.data.score > 0.5) {
        pool.query('INSERT INTO comments (post_id, content) VALUES ($1, $2)', [post_id, content], (error, results) => {
            if (error) {
                throw error
            }

            response.status(201).send(`Comment added!`);
        })
    } else {
        response.status(403).send('Invalid reCAPTCHA. Please try again.');
    }
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

const getPrompt = async (request, response) => {
    pool.query('SELECT prompt FROM prompts WHERE used = false ORDER BY RANDOM() LIMIT 1', (error, results) => {
        if(results.rows.length === 0){
            pool.query('UPDATE prompts SET used = false WHERE used = true', (error, results) => {
                if (error){
                    throw error;
                }
            })
        }
        if (error) {
            throw error
        }

        pool.query('UPDATE prompts SET used = true WHERE prompt = $1', [results.rows[0].prompt], (error, results) => {
            if (error){
                throw error;
            }
        })
        response.status(201).send(results.rows[0].prompt);
    })
}

const submitFeedback = async (request, response) => {
    const { feedback, token, honeypot } = request.body;
    if (honeypot){
        response.status(403).send('Honeypot filled');
        return
    }

    const captchaResponse = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        new URLSearchParams({
            secret: process.env.SECRET_KEY, // Again, ensure this is the secret key
            response: token
        }).toString(),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    if(captchaResponse.data.success && captchaResponse.data.score > 0.5) {
        pool.query('INSERT INTO message (feedback) VALUES ($1)', [feedback], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Post added!`);
        })
    } else {
        response.status(403).send('Invalid reCAPTCHA. Please try again.');
    }
}

const submitMobileFeedback = async (request, response) => {
    const { feedback } = request.body;

    pool.query('INSERT INTO message (feedback) VALUES ($1)', [feedback], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Feedback submitted!`);
    })
}

const submitReport = async (request, response) => {
    const { content_id } = request.body;

    pool.query('INSERT INTO reports (content_id) VALUES ($1)', [content_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Report submitted!`);
    })
}

const createMobilePost = async (request, response) => {
    const { title, content } = request.body;
    pool.query('INSERT INTO posts (title, content) VALUES ($1, $2)', [title, content], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Post added!`);
    })
}

const createMobileComment = async (request, response) => {
    const { post_id, content } = request.body;
    pool.query('INSERT INTO comments (post_id, content) VALUES ($1, $2)', [post_id, content], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Comment added!`);
    })
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    getSinglePost,
    createComment,
    getComments,
    getPrompt,
    submitFeedback,
    submitReport,
    createMobilePost,
    createMobileComment,
    submitMobileFeedback
}
