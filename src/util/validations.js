const validator = require("validator");
const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Weak Password");
  }
  return true;
};
const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "about",
    "emailId",
    "gender",
    "age",
    "photoUrl",
    "skills",
  ];
  const isEditAllowed=Object.keys(req.body).every((field)=>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};
module.exports = { validateSignupData,validateProfileEditData };
