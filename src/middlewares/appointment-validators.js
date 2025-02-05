import { body } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"

export const createAppointmentValidator = [
  body("date").notEmpty().withMessage("Date is required."),
  body("user").notEmpty().withMessage("User is required."),
  body("user").isMongoId().withMessage("Not a valid MongoDB ID."),
  body("pet").notEmpty().withMessage("Mascot is required."),
  body("pet").isMongoId().withMessage("Not a valid MongoDB ID."),
  validarCampos,
  handleErrors,
]

export const updateAppointmentValidator = [
  body("date").notEmpty().withMessage("Date is required."),
  body("user").notEmpty().withMessage("User is required."),
  body("user").isMongoId().withMessage("Not a valid MongoDB ID."),
  body("pet").notEmpty().withMessage("Pet is required."),
  body("pet").isMongoId().withMessage("Not a valid MongoDB ID."),
  validarCampos,
  handleErrors,
]

export const cancelAppointmentValidator = [
  body("date").notEmpty().withMessage("Date is required."),
  body("user").notEmpty().withMessage("User is required."),
  body("user").isMongoId().withMessage("Not a valid MongoDB ID."),
  body("pet").notEmpty().withMessage("Pet is required."),
  body("pet").isMongoId().withMessage("Not a valid MongoDB ID."),
  validarCampos,
  handleErrors,
]
