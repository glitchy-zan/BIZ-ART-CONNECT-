const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

conn.connect((err) => {
  if (err) {
    console.log("ERROR: " + err.message);
    return;
  }
  console.log("Connection established");
});

/***************************************************************************************
 * CRUD
 */
let crudResult = {};

/**
 * CRUD Artist
 */
crudResult.artistCreate = (artist) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO Artist 
        (name, last_name, pseudonym, art_type, genre, location, mail, encrypted_password, portfolio_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        artist.name,
        artist.last_name,
        artist.pseudonym,
        artist.art_type,
        artist.genre,
        artist.location,
        artist.mail,
        artist.encrypted_password,
        artist.portfolio_id,
      ],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

crudResult.artistReadAll = () => {};

crudResult.artistReadByid = (id) => {};

crudResult.artistUpdate = (artist) => {};

crudResult.artistDelete = (artist) => {};

/**
 * CRUD Business
 */

crudResult.businessCreate = (business) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO Business 
        (name, industry, location, description, common_projects, mail, encrypted_password) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        business.name,
        business.industry,
        business.location,
        business.description,
        business.common_projects,
        business.mail,
        business.encrypted_password,
      ],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

module.exports = crudResult;
