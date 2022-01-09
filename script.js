// Assignment code here
// I wanted to be able to pass in different valid character sets and not have to write them out as arrays. I think this solution is flexible while efficient. 
  
// valid password characters
var chars = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', '!"#$%&()*+,-./:;<=>?@[\]^_`{|}~'];
// given desired pwd length
var pwdLen = 10;
// empty string to begin with
var pwd = '';

// randomly choose a character from one of the strings in the chars.Array
function selectCharacter(src){
	// given src string, split it into an array and get a random index of that src
    var rand = Math.floor(Math.random() * (src.split('').length));
    // given random index, return corresponding character
    var char = src.split('')[rand];
	return char
}

// given desired length of password, generate password
function generatePassword(len){
    // loop through password length 
    for(i=0; i<len; i++){
        // choose a random index of the valid character array
        var rand = (Math.floor(Math.random() * chars.length));
        // given the index, get the element
        var src = chars[rand];
        // add returned character to the end of the pwd string
        pwd = pwd + selectCharacter(src);
    }
    // new password!
    return pwd;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  // reset pwd each time we call this
  pwd = ''
  var password = generatePassword(pwdLen);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
