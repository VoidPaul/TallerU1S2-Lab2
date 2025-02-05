import { body, param } from "express-validator"
import { emailExists, usernameExists, userExists } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-fields.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-errors.js"

export const registerValidator = [
  body("name").notEmpty().withMessage("Name required."),
  body("username").notEmpty().withMessage("Username required."),
  body("email").notEmpty().withMessage("E-mail required."),
  body("email").isEmail().withMessage("Not a valid e-mail."),
  body("email").custom(emailExists),
  body("username").custom(usernameExists),
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  validarCampos,
  deleteFileOnError,
  handleErrors,
]

export const loginValidator = [
  body("email").optional().isEmail().withMessage("Not a valid e-mail."),
  body("username").optional().isString().withMessage("Wrong user format."),
  body("password").isLength({ min: 4 }).withMessage("Password must be at least 4 characters."),
  validarCampos,
  handleErrors,
]

export const getUserByIdValidator = [
  param("uid").isMongoId().withMessage("Not a valid MongoDB ID."),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors,
]

export const deleteUserValidator = [
  param("uid").isMongoId().withMessage("Not a valid MongoDB ID."),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors,
]

export const updatePasswordValidator = [
  param("uid").isMongoId().withMessage("Not a valid MongoDB ID."),
  param("uid").custom(userExists),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters."),
  validarCampos,
  handleErrors,
]

export const updateUserValidator = [
  param("id", "Not a valid ID.").isMongoId(),
  param("id").custom(userExists),
  validarCampos,
  handleErrors,
]
