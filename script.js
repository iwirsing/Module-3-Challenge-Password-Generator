// Assignment Codes
var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector("#copy");
var passwordLength = 0; 
var passwordIfUppercase;
var passwordIfLowercase;
var passwordIfNumeric;
var passwordIfSpecialCharacters;

//Function 1
// Prompt for criteria and write password to the #password input
function writePassword() {
  //prompt for password characters and store input inside an object
  var passwordType={
  passwordLength: window.prompt("From 8 to 128, how long will your password be?"),
  passwordIfLowercase: window.confirm("Would you like lowercase characters in your password??"),
  passwordIfUppercase: window.confirm("Would you like UPPERCASE characters in your password?"),
  passwordIfNumeric: window.confirm("Include numeric characters?"),
  passwordIfSpecialCharacters: window.confirm("Include special characters?")
  }
  
  //check if password length is valid: between 8 and 128
  if ((passwordType.passwordLength<8)||(passwordType.passwordLength>128) || (isNaN(passwordType.passwordLength))){
    window.alert("Password length error: Choose a number from 8 to 128. Kindly start over.");
    //prompt again or restart
    writePassword();
  }
  //check if there is any input for character type: if selection for all types is false then, none was selected
  else if ((!passwordType.passwordIfUppercase)&&(!passwordType.passwordIfLowercase)&&(!passwordType.passwordIfNumeric)&&(!passwordType.passwordIfSpecialCharacters)){
    window.alert("Password type error: Choose at least one type of characters. Kindly start over.");
    //prompt again or restart
    writePassword(); 
  }
  // if all criteria are met, password will be generated and written
  else{
    //show selection choice summary and generate the password
    window.alert("Password summary-- "+passwordType.passwordLength+" characters || uppercase: "+passwordType.passwordIfUppercase+"|| lowercase: "+passwordType.passwordIfLowercase+"|| numeric: "+passwordType.passwordIfNumeric+"|| special characters: "+passwordType.passwordIfSpecialCharacters);
    var password = generatePassword(passwordType);
    var passwordText=document.querySelector("#password");
    //print password without commas
    passwordText.value=password.join(''); 
  }
  
  return;
}
 
//Function 2  
//Generating Password with said criteria
function generatePassword(passwordObject){
  const uppercaseLetters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters="abcdefghijklmnopqrstuvwxyz";
  const numeric="0123456789";
  const specialCharacters=" !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
  var passwordChoice=[]; 
  
  //build the passwordChoice string 
  //if uppercase is confirmed
  if (passwordObject.passwordIfUppercase===true){
    passwordChoice=passwordChoice+uppercaseLetters;
  }
  //if lowercase is confirmed
  if (passwordObject.passwordIfLowercase===true){
    passwordChoice=passwordChoice+lowercaseLetters;
  }
  //if numeric is confirmed
  if (passwordObject.passwordIfNumeric===true){
    passwordChoice=passwordChoice+numeric;
  }
  //if special characters is confirmed
  if (passwordObject.passwordIfSpecialCharacters===true){
    passwordChoice=passwordChoice+specialCharacters;
  }
  
  //stores the generated password
  var generatedPassword=[];

  //generate random characters from built up string
  for (let i=0; i<passwordObject.passwordLength; i++){
    //LetChar stores the random characters
    var LetChar=passwordChoice[Math.floor(Math.random()*passwordChoice.length)];
    generatedPassword[i]=LetChar;
  }
  //returns generated password
  return generatedPassword;
}

//Function 3 
// Copy the Password into the clipboard
async function copyPassword(){
  var copyPass=document.getElementById("password");
  copyPass.select();
  await parent.navigator.clipboard.writeText(copyPass.value);
  // prompt the user of the copied password
  window.alert("Password "+ copyPass.value+" is copied.")
 
}



// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// //Add event listener to copy to clipboard button
copyBtn.addEventListener("click", copyPassword);