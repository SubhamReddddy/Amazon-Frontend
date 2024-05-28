export const checkName = (username) => {
  // Define regular expression for full name format
  var regex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*\s+[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/; // Allows only letters and spaces, with at least one space separating first and last names

  // Check if the input matches the regular expression
  return regex.test(username);
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const checkPhoneno = (phoneno) => {
  // Define regular expression for phone number format
  var regex = /^\d{10}$/; // Assumes 10 digits (adjust as per your requirement)

  // Check if the input matches the regular expression
  return regex.test(phoneno);
};

export function checkPasswordStrength(password) {
  // Define regular expressions for different criteria
  var regexLength = /.{6,}/; // At least 6 characters long
  var regexUpperCase = /[A-Z]/; // Contains uppercase letters
  var regexLowerCase = /[a-z]/; // Contains lowercase letters
  var regexNumber = /\d/; // Contains numbers
  var regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Contains special characters

  // Check each criteria
  var lengthValid = regexLength.test(password);
  var upperCaseValid = regexUpperCase.test(password);
  var lowerCaseValid = regexLowerCase.test(password);
  var numberValid = regexNumber.test(password);
  var specialCharValid = regexSpecialChar.test(password);

  // Calculate score based on criteria met
  var score = 0;
  if (lengthValid) score++;
  if (upperCaseValid) score++;
  if (lowerCaseValid) score++;
  if (numberValid) score++;
  if (specialCharValid) score++;

  // Determine the strength based on score
  var strength;
  if (score === 5) strength = "Very Strong";
  else if (score >= 3) strength = "Strong";
  else if (score >= 2) strength = "Moderate";
  else if (score >= 1) strength = "Weak";
  else strength = "Very Weak";

  return strength;
}

export const checkPinCode = (pincode) => {
  // Define regular expression for phone number format
  var regex = /^\d{6}$/; // Assumes 6 digits (adjust as per your requirement)

  // Check if the input matches the regular expression
  return regex.test(pincode);
};
