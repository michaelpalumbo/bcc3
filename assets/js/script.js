// Assignment code here

// valid password characters
var chars = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', '!"#$%&()*+,-./:;<=>?@[\]^_`{|}~'];
// empty string to begin with
var pwd = '';

// password length
var pwdLen = 8;
// get password length from user
function setLength(a){
  if(a.value >=8 && a.value <=128){
    pwdLen = a.value
  } else {
    alert("Password length must be between 8-128")
  }
}

// given user checkboxes...
var selectedChars = []
// fill with chosen character sets
function setChars(a){
  var thisChar = chars[a.value]
  // populate chosen character set into available sets
  if (a.checked){
    selectedChars.push(thisChar)
  } else {
    // loop through array, find this char set, remove it
    for(i=0; i<selectedChars.length; i++){
      if(selectedChars[i] === thisChar){
        selectedChars.splice(i, 1)
      }
    }
  }
}

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
  // first ensure that at least one character set is selected
  if(selectedChars.length == 0){
    alert('Error: Choose at least one character set')
    return
  }
  // reset pwd each time we call this
  pwd = ''
  // loop through password length 
  for(i=0; i<len; i++){
    // choose a random index of the selected character array
    var rand = (Math.floor(Math.random() * selectedChars.length));
    // given the index, get the element
    var src = selectedChars[rand];
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
  var password = generatePassword(pwdLen);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
