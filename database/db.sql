CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHART(16) NOT NULL,
    password VARCHART(60) NOT NULL,
    fullname VARCHART(100) NOT NULL,
);

ALTER TABLE users
    ADD PRIMARY KEY (id);
ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT =2;

DESCRIBE users;

CREATE TABLE links(
    id INT(11) NOT NULL,
    title VARCHART(150) NOT NULL,
    url VARCHAT(255) NOT NULL,
    description TEXT,
    user_id INT(11)
    created_at TIMESTAMP NOT NULL DEFAULT current_stimestamp,
    CONSTRAINT fk_user FOREIGN KEY  (user_id) REFERENCES  users(id)
);
