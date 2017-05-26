const DB = {
  "connection_failed": {
    desc: "The server could not connect the the database",
    public: "The server encountered a problem",
    http_code: 504
  },
  "not_enough_args": {
    desc: "Not enough arguments were provided for the query",
    public: "The server encountered a problem",
    http_code: 504
  }
}

// function map_error_to_func (def) {
//   let errorNames = Object.keys(def);

//   const returnObj = {};

//   errorNames.forEach(v => {
//     returnObj[v] = (msg) => {
//       let error = new Error(msg);
//       error.desc = def[v].desc;
//       error.public = def[v].public;
//       error.http_code = def[v].http_code;

//       return error;
//     }
//   })
// }



// const error_proxy_handler = {
//   get: (target, name) => {
//     if(!target[name]) throw Error('Requested error not found');

//     return function(msg) {
//       let error = new Error(msg);
//       error.desc = target[name].desc;
//       error.public = target[name].publc;
//       error.http_code = target[name].http_code;

//       return error;
//     }
//   }
// }

module.exports = {
  DB,
  create: (errorObj, msg) => {
    return Object.assign(new Error(msg), errorObj);
  }
}