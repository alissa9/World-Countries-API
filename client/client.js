/*Saving the user details from the html form then requesting to 
 send the details from the server*/
function sendUserInfo() {

	let request = new XMLHttpRequest();
	let userName = document.getElementById('nameInput');
	let userPassword = document.getElementById('passwordInput');
	let userEmail = document.getElementById('emailInput');
	let userClassroom = document.getElementById('classInput');
	let userCountry = document.getElementById('countryInput');
	let signinContainer = document.getElementsByClassName('signup-form')[0]


	let userInfo = {
		Name: userName.value,
		Password: userPassword.value,
		Email: userEmail.value,
		Classroom: userClassroom.value,
		Country: userCountry.value
	}
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {


			document.getElementById('msgSingup').innerHTML = "You have Signed up"
			console.log("sent");




		}
	};
	request.open("POST", "/signup", true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(JSON.stringify({ NewUser: userInfo }));

}


/*Getting the user loggin details then sending it to the 
  server to compare if its in  the dat base  */
function logUserInfo() {

	let request = new XMLHttpRequest();

	let userPassword = document.getElementById('password');
	let userEmail = document.getElementById('email');
	let formContainer = document.getElementsByClassName('login-form')[0];

	let userInfo = {
		Password: userPassword.value,
		Email: userEmail.value

	}
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(request.responseText);
			if (response.status == "Successfull") { // CORRECT DETAILS
				formContainer.innerHTML = "<p> You Are Logged in! <p>"
				console.log(response.status);


			} else { // INCORRECT DETAILS
				formContainer.innerHTML = "<p> try again<p>"

			}

		}
	};
	request.open("POST", "/signin", true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(JSON.stringify({ loginData: userInfo }));

}

function example() {
	let request = new XMLHttpRequest();


	request.open("POST", "/example", true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(JSON.stringify({ Message: "Testing server" }));

}


example();
