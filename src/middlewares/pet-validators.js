import { body, param } from "express-validator"
import { petExists } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"

export const createPetValidator = [
  body("name").notEmpty().withMessage("A name is required."),
  body("description").notEmpty().withMessage("A description is required"),
  body("age").isInt({ min: 0 }).withMessage("An age is required."),
  body("type").notEmpty().withMessage("A type is required."),
  body("email").isEmail().withMessage("A valid owner e-mail is required."),
  validarCampos,
  handleErrors,
]

export const getPetByIdValidator = [
  param("id").isMongoId().withMessage("Not a valid MongoDB ID."),
  param("id").custom(petExists),
  validarCampos,
  handleErrors,
]

export const updatePetValidator = [
  param("id").isMongoId().withMessage("Not a valid MongoDB ID."),
  param("id").custom(petExists),
  body("name").optional().notEmpty().withMessage("A name is required."),
  body("description").optional().notEmpty().withMessage("A description is required."),
  body("age").optional().isInt({ min: 0 }).withMessage("Age must be a positive whole number."),
  body("type").optional().notEmpty().withMessage("A type is required."),
  validarCampos,
  handleErrors,
]

export const deletePetValidator = [
  param("id").isMongoId().withMessage("Not a valid MongoDB ID."),
  param("id").custom(petExists),
  validarCampos,
  handleErrors,
]
