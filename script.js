// Assignment Codes
var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector("#copy");
var passwordLength = 0; 
var passwordIfUppercase;
var passwordIfLowercase;
var passwordIfNumeric;
var passwordIfSpecialCharacters;

// Function 1
// Prompt for criteria and write password to the #password input
function writePassword() {
  //initiate object to store prompt answers for password criteria 
  var passwordType={
  passwordLength: window.prompt("From 8 to 128, how long will your password be?")
  }
  
  //check if password length is valid: between 8 and 128
  if ((passwordType.passwordLength<8)||(passwordType.passwordLength>128) || (isNaN(passwordType.passwordLength))){
    //print error in password screen
    var passwordText=document.querySelector("#password");
    passwordText.value="Password length error: Choose a number from 8 to 128. Kindly start over.";
  }
  else //confirm selection and continue prompting
  {
    alert("Your password will have "+passwordType.passwordLength+" characters.");

    //LOWERCASE: prompt for lowercase and store it in the object
    Object.assign(passwordType,{ passwordIfLowercase: window.confirm("Would you like lowercase characters in your password?")})
    //confirm selection for lowercase
    if (passwordType.passwordIfLowercase===true){
      alert("Your password will have lowercase characters.");
    }
    else{
      alert("Your password will have NO lowercase characters.");
    }
    
    //UPPERCASE: prompt for UPPERCASE and store it in the object
    Object.assign(passwordType,{ passwordIfUppercase: window.confirm("Would you like UPPERCASE characters in your password?")})
    //confirm selection for UPPERCASE
    if (passwordType.passwordIfUppercase===true){
      alert("Your password will have UPPERCASE characters.");
    }
    else{
      alert("Your password will have NO UPPERCASE characters.");
    }

    //NUMERIC: prompt for numeric and store it in the object
    Object.assign(passwordType,{ passwordIfNumeric: window.confirm("Would you like numeric characters in your password?")})
    //confirm selection for numeric
    if (passwordType.passwordIfNumeric===true){
      alert("Your password will have numeric characters.");
    }
    else{
      alert("Your password will have NO numeric characters.");
    }

    //SPECIAL CHARACTERS: prompt for special characters and store it in the object
    Object.assign(passwordType,{ passwordIfSpecialCharacters: window.confirm("Would you like special characters in your password?")})
    //confirm selection for special characters
    if (passwordType.passwordIfSpecialCharacters===true){
      alert("Your password will have special characters.");
    }
    else{
      alert("Your password will have NO special characters.");
    }
  
    //check at least one type of character selected: if selection for all types is false then, none was selected
    if ((!passwordType.passwordIfUppercase)&&(!passwordType.passwordIfLowercase)&&(!passwordType.passwordIfNumeric)&&(!passwordType.passwordIfSpecialCharacters)){
      //print error in password screen
      var passwordText=document.querySelector("#password");
      passwordText.value="Password generation error: Please choose at least one type of characters. Kindly start over.";
    }
    // if all criteria are met, password will be generated and written
    else{
      //show selection choice summary and generate the password
      window.alert("Password summary-- "+passwordType.passwordLength+" characters, lowercase: "+passwordType.passwordIfLowercase+", UPPERCASE: "+passwordType.passwordIfUppercase+" , numeric: "+passwordType.passwordIfNumeric+", and special characters: "+passwordType.passwordIfSpecialCharacters);
      var password = generatePassword(passwordType);
      var passwordText=document.querySelector("#password");
      //print password without commas
      passwordText.value=password.join(''); 
    }
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

//Add event listener to copy to clipboard button
copyBtn.addEventListener("click", copyPassword);