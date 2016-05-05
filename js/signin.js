/***********************************************************
* Created by: Nicole Cote
*
* Demonstrates regular expressions for username and 
* password requirements.
*
***********************************************************/


function submitInfo(userName, passWord, check) {

	//Form data
	userName = document.getElementById('username').value;
	passWord = document.getElementById('password').value;

	//Regular expression data for username requirements
	var regex_userNameBegin = /^([a-zA-Z])/;
	var regex_userNameLength = /^([a-zA-Z0-9\.\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}]+){8,20}$/;
	var regex_userNameEnd = /[a-zA-Z]$/;
	console.log("Username: " + userName);
	
	//Check that username requirements are met
	//Check that the beginning of the username is a letter
	var checkBeginning = regex_userNameBegin.test(userName);
	console.log("Check Beginning: " + checkBeginning);

	//Check that the length of the username is 8-20 characters long
	var checkUserNameLength = regex_userNameLength.test(userName);
	console.log("Check Username Length: " + checkUserNameLength);
	console.log("Username length: " + userName.length);
	
	//Check the the end of the username is a letter
	var checkEnd = regex_userNameEnd.test(userName);
	console.log("Check End: " + checkEnd);
	
	if(!checkBeginning) {
		usernameError.innerHTML = "**Username does not begin with a letter.";
	} 

	if(!checkUserNameLength) {
		usernameError.innerHTML = "**Username does not meet length requirements. Current username length = " + userName.length;
	} 
	
	if(!checkEnd) {
		usernameError.innerHTML = "**Username does not end with a letter.";
	} 

	if(checkBeginning && checkUserNameLength && checkEnd) usernameError.innerHTML = "";

/*************************************************************************************************/

	//Regular expression data for password requirements
	var regex_passWordLength = /^([a-zA-Z0-9\&\*\$]+){8,}$/;
	var regex_passWordRequirements = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])(?=.*[\&\*\$]))|((?=.*[a-z])(?=.*[\&\*\$])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[\&\*\$])(?=.*[0-9]))/; 

	//Check that password requirements are met
	//Check that the length of the password is at least 8 characters long
	var checkPassWordLength = regex_passWordLength.test(passWord);
	console.log("Check Password Length: " + checkPassWordLength);
	console.log("Password Length: " + passWord.length);

	//Check that password contains 3 out of 4 requirements listed in #2
	var checkPassWordRequirements = regex_passWordRequirements.test(passWord);
	console.log("Check Password Requirements: " + checkPassWordRequirements);

	if(!checkPassWordLength) {
		passwordError.innerHTML = "**Password does not meet length requirements or contains an invalid special character. Current password length = " + passWord.length;
	}

	if(!checkPassWordRequirements) {
		passwordError.innerHTML = "**Password does not contain 3 out of the 4 special requirements. Current password length = " + passWord.length;
	}

	var valid = false;
	if(checkSimilarity(userName,passWord) == true) {
		passwordError.innerHTML = "**Password contains all or part of your username."
	}

	if(checkPassWordLength && checkPassWordRequirements && (checkSimilarity(userName,passWord) == valid)) {
		passwordError.innerHTML = "";
	}

	if(checkBeginning && checkUserNameLength && checkEnd && checkPassWordLength 
		&& checkPassWordRequirements && (checkSimilarity(userName,passWord) == valid)) {
		success.innerHTML = " Successful";
	} else success.innerHTML = "";

}

function checkSimilarity(userName, passWord) {
	var i;
	for(i = 1; i < (passWord.length - 2); i++) {
		if(passWord.indexOf(userName.substring(i,(i+2))) != -1) {
			return true;
		}
	}
	return false;
}