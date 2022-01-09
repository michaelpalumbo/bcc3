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

// get it
console.log(generatePassword(pwdLen));