import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),

  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant Name is required"),
  body("city").notEmpty().withMessage("city is required"),
  body("country").notEmpty().withMessage("country is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery must be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a positive integer"),
  body("cuisines")
    .isArray()
    .withMessage("cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("cuisines array cannot be empty"),
    body("menuItems").isArray().withMessage("menuItems must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu Items name is required"),
    body("menuItems.*.price").isFloat({min:0}).withMessage("Menu Items price is required and must be a positive number "),
    handleValidationErrors,

];
