CREATE DATABASE felkonexlive;

CREATE TABLE compilations(
    video_id VARCHAR(80) PRIMARY KEY,
    thumbnail_url VARCHAR(255),
    title VARCHAR(255),
    published_at DATE
);

CREATE TABLE vods(
    video_id VARCHAR(80) PRIMARY KEY,
    thumbnail_url VARCHAR(255),
    title VARCHAR(255),
    published_at DATE
);