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

/************************************************************************************************************************************************
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

// TODO implement
crudResult.artistReadAll = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Artist`, (err, res) => {
      if (err) {
        return reject(err);
      }
      if (res.length > 0) {
        return resolve({ exists: true, artist: res });
      }
      // no artist
      return resolve({ exists: false });
    });
  });
};

crudResult.artistReadByMail = (mail) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Artist WHERE mail = ?`, [mail], (err, res) => {
      if (err) {
        return reject(err);
      }
      if (res.length > 0) {
        return resolve({ exists: true, artist: res[0] });
      }
      // no artist
      return resolve({ exists: false });
    });
  });
};

crudResult.artistUpdate = (artist) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE Artist 
       SET 
         name = ?, 
         last_name = ?, 
         pseudonym = ?, 
         art_type = ?, 
         genre = ?, 
         location = ?, 
         mail = ?, 
         encrypted_password = ?, 
         portfolio_id = ?
       WHERE 
         id = ?`,
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
        artist.id,
      ],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

// TODO implement
crudResult.artistDelete = (artist) => {};

/************************************************************************************************************************************************
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

crudResult.businessReadByMail = (mail) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Business WHERE mail = ?`, [mail], (err, res) => {
      if (err) {
        return reject(err);
      }
      if (res.length > 0) {
        return resolve({ exists: true, business: res[0] });
      }
      // no business
      return resolve({ exists: false });
    });
  });
};

// TODO implement
crudResult.businessUpdate = (business) => {};

// TODO implement
crudResult.businessDelete = (business) => {};

/************************************************************************************************************************************************
 * CRUD Portfolio
 */

crudResult.portfolioCreate = (portfolio) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO Portfolio 
        (artist_representation) 
        VALUES (?)`,
      [portfolio.artist_representation],
      (err, res) => {
        if (err) return reject(err);
        return resolve({
          portfolio_id: res.insertId,
        });
      }
    );
  });
};

// TODO implement
crudResult.portfolioReadAll = () => {};

crudResult.portfolioReadByID = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Portfolio WHERE id = ?`, [id], (err, res) => {
      if (err) {
        return reject(err);
      }
      if (res.length > 0) {
        return resolve({ exists: true, portfolio: res[0] });
      }
      // no portfolio
      return resolve({ exists: false });
    });
  });
};

// TODO implement
crudResult.portfolioUpdate = (artist) => {};

// TODO implement
crudResult.portfolioDelete = (artist) => {};

/************************************************************************************************************************************************
 * CRUD Work
 */

crudResult.workCreate = (work) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO Work 
        (title, medium, creation_date, description, portfolio_id) 
        VALUES (?, ?, ?, ?, ?)`,
      [
        work.title,
        work.medium,
        work.creation_date,
        work.description,
        work.portfolio_id,
      ],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

// can return multiple
crudResult.workReadByPortfolioId = (portfolioId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM Work WHERE portfolio_id = ?`,
      [portfolioId],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        if (res.length > 0) {
          return resolve({ exists: true, work: res });
        }
        // no work
        return resolve({ exists: false });
      }
    );
  });
};

crudResult.workUpdate = (work) => {};

crudResult.workDelete = (workId) => {
  return new Promise((resolve, reject) => {
    conn.query(`DELETE FROM Work WHERE id = ?`, [workId], (err, res) => {
      if (err) {
        return reject(err);
      }
      if (res.affectedRows > 0) {
        return resolve({ deleted: true });
      }
      // no work deleted
      return resolve({ deleted: false });
    });
  });
};

/************************************************************************************************************************************************
 * CRUD Work img
 */

crudResult.workImgCreate = (workImg) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO Work_img 
        (work_id, image_path) 
        VALUES (?, ?)`,
      [workImg.work_id, workImg.image_path],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

// can return multiple
crudResult.workImgReadByWorkId = (workId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM Work_img WHERE work_id = ?`,
      [workId],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        if (res.length > 0) {
          return resolve({ exists: true, work_img: res });
        }
        return resolve({ exists: false });
      }
    );
  });
};

crudResult.workImgUpdate = (workImg) => {};

crudResult.workImgDelete = (workImgId) => {
  return new Promise((resolve, reject) => {
    conn.query(`DELETE FROM Work_img WHERE id = ?`, [workImgId], (err, res) => {
      if (err) {
        return reject(err);
      }
      if (res.affectedRows > 0) {
        return resolve({ deleted: true });
      }
      // no image deleted
      return resolve({ deleted: false });
    });
  });
};

/************************************************************************************************************************************************
 * CRUD Award
 */

crudResult.awardCreate = (award) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO Award 
        (name, organization, description, date, portfolio_id) 
        VALUES (?, ?, ?, ?, ?)`,
      [
        award.name,
        award.organization,
        award.description,
        award.date,
        award.portfolio_id,
      ],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

crudResult.awardReadByPortfolioId = (portfolioId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM Award WHERE portfolio_id = ?`,
      [portfolioId],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        if (res.length > 0) {
          return resolve({ exists: true, award: res });
        }
        return resolve({ exists: false });
      }
    );
  });
};
crudResult.awardUpdate = (award) => {};
crudResult.awardDelete = (award) => {};

/************************************************************************************************************************************************
 * CRUD Award img
 */

crudResult.awardImgCreate = (awardImg) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO Award_img 
        (award_id, image_path) 
        VALUES (?, ?)`,
      [awardImg.award_id, awardImg.image_path],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

crudResult.awardImgReadByawardId = (awardId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM Award_img WHERE award_id = ?`,
      [awardId],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        if (res.length > 0) {
          return resolve({ exists: true, award_img: res });
        }
        return resolve({ exists: false });
      }
    );
  });
};
crudResult.awardImgUpdate = (awardImg) => {};
crudResult.awardImgDelete = (awardImg) => {};

/************************************************************************************************************************************************
 * CRUD Experience
 */

crudResult.experienceCreate = (experience) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO Experience 
        (title, date, description, portfolio_id) 
        VALUES (?, ?, ?, ?)`,
      [
        experience.title,
        experience.date,
        experience.description,
        experience.portfolio_id,
      ],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

crudResult.experienceReadByPortfolioId = (portfolioId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM Experience WHERE portfolio_id = ?`,
      [portfolioId],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        if (res.length > 0) {
          return resolve({ exists: true, experience: res });
        }
        // no work
        return resolve({ exists: false });
      }
    );
  });
};
crudResult.experienceUpdate = (experience) => {};
crudResult.experienceDelete = (experience) => {};

/************************************************************************************************************************************************
 * CRUD Experience img
 */

crudResult.experienceImgCreate = (experienceImg) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO Experience_img
        (experience_id, image_path) 
        VALUES (?, ?)`,
      [experienceImg.experience_id, experienceImg.image_path],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

crudResult.experienceImgReadByexperienceId = (experienceId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM Experience_img WHERE experience_id = ?`,
      [experienceId],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        if (res.length > 0) {
          return resolve({ exists: true, experience_img: res });
        }
        return resolve({ exists: false });
      }
    );
  });
};
crudResult.experiencemgUpdate = (experienceImg) => {};
crudResult.experienceImgDelete = (experienceImg) => {};

/************************************************************************************************************************************************
 * END
 */

module.exports = crudResult;
