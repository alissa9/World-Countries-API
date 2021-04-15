const express = require('express')
const database = require("./database.js");
const bodyParser = require('body-parser')
const app = express()
const port = 3000;

app.use(express.static('../client'));
app.use(bodyParser.json());
app.post('/signup', signUpUser);
app.post('/signIn', signInUser);
// app.post('/example', Example);


/* Loading and saving the user details to the database */
function signUpUser(req, res) {

    let newUser = req.body.NewUser;

    database.storeNewUser(newUser);
    res.send({ Message: "stored" })


}

/*Chekcing if the logged in info matches with the database 
then sending a message to the user if they are logged in */
async function signInUser(req, res) {
    let sentData = req.body.loginData;

    let allUsers = await database.getAllUsers();

    allUsers.forEach(user => {
        if (user.email == sentData.Email && user.password == sentData.Password) {
            res.send({ status: "Successfull" })

        }
    });

}





app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

