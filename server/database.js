/*The database connection  */
const mysql = require("mysql");
let connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "root",
    password: "Root@123",
    database: "studentproject",
    debug: false,
});

/*Stroing the new user details in mysql database using insert one command */
function storeNewUser(userInfo) {

    let sql = ` INSERT INTO user (user_id, name, email,password,university,country)
      VALUES ( default, "${userInfo.Name}", "${userInfo.Email}", "${userInfo.Password}","${userInfo.Classroom}","${userInfo.Country}");`;

    connectionPool.query(sql, (err, result) => {
        if (err) {
            //Check for errors
            console.error(`Error executing query: ${JSON.stringify(err)}`);
        } else {
            console.log(JSON.stringify(result));
        }
    });
}

/*Getting all the users from the data base then comparing it 
 with the inserted details from the user to log in */
async function getAllUsers() {
    let sql = `select * from studentproject.user`;
    //Wrap the execution of the query in a promise
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) {
                //Check for errors
                reject("Error executing query: " + JSON.stringify(err));
            } else {
                //Resolve promise with results
                resolve(result);
            }
        });
    });
}
module.exports = { storeNewUser, getAllUsers };