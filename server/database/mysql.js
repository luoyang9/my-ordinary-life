const mysql = require('mysql');
const errors = require('../errors/errors');


module.exports = class Database {
  constructor({ host, user, password, database }) {
    this.db = mysql.createConnection({
      host,
      user,
      password,
      database
    })

    this.db.connect(e => {
      if(e) throw errors.create(errors.DB.connection_failed, e.message);
    });
  }

  query(query, args) {
    return new Promise((resolve, reject) => {
      let queryString;

      if (args) {
        let counter = 0;
        queryString = query.replace(/\?/g, () => {
          if(counter >= args.length) 
          reject(errors.create(errors.DB.not_enough_args, query));
        })
      }

      this.db.query(queryString, (error, results, fields) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }


}