CREATE TABLE posts (
    post_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(100000) NOT NULL
);

ALTER TABLE comments
ADD COLUMN created_at DATE NOT NULL DEFAULT CURRENT_DATE;

CREATE TABLE comments (
    comment_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id VARCHAR(255) NOT NULL,
    content VARCHAR(100000) NOT NULL
);