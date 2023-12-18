import {body} from "express-validator";
import {inputValidation} from "../middlewares_validation/input-validation";

export const nameValidation = body('name')
    .isString().withMessage("Incorrect name")
    .trim()
    .isLength({min: 1, max: 15})
    .withMessage("Incorrect name!");


export const descriptionValidation = body('description')
    .isString()
    .trim()
    .isLength({min: 1, max: 500})
    .withMessage("Incorrect description!");


export const websiteUrlValidation = body('websiteUrl')
    .isString().withMessage("Incorrect name")
    .trim()
    .isLength({min: 1, max: 100})
    .matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
    .withMessage("Incorrect websiteUrl!");


export const blogValidation = () =>
    [
        nameValidation,
        descriptionValidation
        /*websiteUrlValidation,
        inputValidation*/
    ]