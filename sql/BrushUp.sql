CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_picture TEXT,
    bio TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isAdmin BOOLEAN
);

CREATE TABLE tokens (
    token_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    expires TIMESTAMP NOT NULL
);

CREATE TABLE followers (
    follow_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    followed UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE articles (
    article_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    cover TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE articlecomments (
    comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    text TEXT NOT NULL
);

CREATE TABLE bookmarks (
    bookmark_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE tags (
    tag_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7)
);

CREATE TABLE articletags (
    tag_id UUID NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
    article_id UUID NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
    PRIMARY KEY (tag_id, article_id)
);

CREATE TABLE imagetags (
    tag_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE imagereferences (
    reference_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL
);

CREATE TABLE referencetags (
    tag_id UUID NOT NULL REFERENCES imagetags(tag_id) ON DELETE CASCADE,
    reference_id UUID NOT NULL REFERENCES imagereferences(reference_id) ON DELETE CASCADE,
    PRIMARY KEY (tag_id, reference_id)
);

CREATE TABLE articleimages (
    image_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    article_id UUID NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE
)