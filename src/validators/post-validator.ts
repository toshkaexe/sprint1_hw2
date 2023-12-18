import {body} from "express-validator";
import {inputValidation} from "../middlewares_validation/input-validation";
import {BlogRepository} from "../repositories/blog-repository";
import {PostRepository} from "../repositories/post-repository";

export const titleValidation = body('title')
    .isString().withMessage("Incorrect name")
    .trim()
    .isLength({min: 1, max: 30})
    .withMessage("Incorrect title!");

export const shortDescriptionValidation = body('shortDescription')
    .isString()
    .withMessage("Incorrect shortDescription")
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage("Incorrect shortDescription!");


export const contentValidation = body('content')
    .isString()
    .withMessage("Incorrect content")
    .trim()
    .isLength({min: 1, max: 1000})
    .withMessage("Incorrect content!");


export const blogIdValidation = body('blogId')
    .isString().withMessage("Incorrect blogId")
    .trim()
    .custom(
        (value) => {
            const blog = BlogRepository.getBlogById(value)
            if (!blog) {
                throw Error("Incorrect blogId!")
            }
            return true;
        }
    )
    .withMessage("Incorrect blogId!");

export const postValidation = () => [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidation
    ]
