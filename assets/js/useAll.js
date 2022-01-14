// SETUP //
// available character sets
var charSets = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', '!"#$%&()*+,-./:;<=>?@[\]^_`{|}~'];
// password object
pwd = {
    length: 8,
    sets: {},
    phrase: []
}

// set random number of sets (in the browser user would do this manually)
var amt = Math.floor(Math.random() * charSets.length) + 1
// choose which sets to include given amt
for(i=0;i<amt;i++){
    var set = Math.floor(Math.random() * charSets.length)
    pwd.sets[i]={
        characters: charSets[set],
        count: 0,
        indeces: []
    }
    charSets.splice(set, 1)
}
// build password
for(i=0; i<pwd.length; i++){
    // choose a set
    var randSetIndex = Math.floor(Math.random() * amt)
    // increase the histogram value for the chosen character set (need this later)
    pwd.sets[randSetIndex.toString()].count++
    // choose a character from chosen set
    randCharIndex = Math.floor(Math.random() * pwd.sets[randSetIndex.toString()].characters.split('').length)
    // add the character to the password phrase
    pwd.phrase.push(pwd.sets[randSetIndex.toString()].characters[randCharIndex])
    // add index of password array to the set's index reference (need this later as well)
    pwd.sets[randSetIndex.toString()].indeces.push(i)
}


var setIndeces = Object.keys(pwd.sets)
// these are sets which have 2 or more characters in the password
var toBeReplaced = []
// these are sets which have 0 characters included in the password
var needsChar = []
// iterate over set histogram
function checkUsage(){
    // reset these each time this is run
    needsChar = []
    toBeReplaced = []
    setIndeces = Object.keys(pwd.sets)
    // for each set, compare their count value against the following conditions
    for(i=0;i<setIndeces.length;i++){
        var count = pwd.sets[i.toString()].count
        if(count > 1){
            // this set has enough characters in the password, so flag it's first instance as available for replacement by a set that has 0
            toBeReplaced.push(i)
        } else if (count === 1){
            // this set has only one instance, so leave as is
        } else {
            // this set needs to be included
            needsChar.push(i)         
        }
    }
    // after running this function, if there is a set(s) that needs to be included, run the replace function
    if(needsChar.length > 0){
        replace()
    }
}
checkUsage()

// this function takes the first set in the needsChar array and adds one of its characters to the pass word by replacing a character belonging to a set which has 2 or more of its own characters in the password already. 
function replace(){
    // this set will have one of its characters replaced
    target = toBeReplaced[0].toString()
    // password index to replace the character
    var replaceIndex = pwd.sets[target].indeces[0]
    // get a new character from the set with 0 characters
    randCharIndex = Math.floor(Math.random() * pwd.sets[needsChar[0].toString()].characters.split('').length)
    // replace the old character with the new character
    pwd.phrase[replaceIndex] = pwd.sets[needsChar[0].toString()].characters[randCharIndex]
    // update the count and indeces for both sets
    pwd.sets[needsChar[0].toString()].count++
    pwd.sets[target].count--
    pwd.sets[target].indeces.shift()
    pwd.sets[needsChar[0].toString()].indeces.push(replaceIndex)
    // then check the histogram again
    checkUsage()
}

// the histogram is confirmed to have all sets with a count of at least 1. 
console.log(pwd)
// would pass this back to the user:
console.log('final password:', pwd.phrase.join(''))


