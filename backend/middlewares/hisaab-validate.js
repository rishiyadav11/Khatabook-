const Joi = require("joi");

// Define the validation schema with the correct types
const hissabJoiSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  content: Joi.string().required(),
  isShareable: Joi.boolean(),
  isEditable: Joi.boolean(),
  isEncrypted: Joi.boolean(), // Use boolean if it's a checkbox
  hissabpass: Joi.string().optional() // Make sure to include this if it's required when `isEncrypted` is true
});

// Middleware to validate Hissab data
const validateHissabData = (req, res, next) => {
  console.log(req.body);
  const { error } = hissabJoiSchema.validate(req.body);

  if (error) {
    // Send a 400 Bad Request response with the validation error
    res.status(400).json({ message: error.details[0].message });
  } else {
    // If validation passes, proceed to the next middleware or route handler
    next();
  }
};

module.exports = validateHissabData;
