import {Router, Request, Response} from 'express';
import {BlogRepository} from "../repositories/blog-repository";
import {authMiddleware} from "../middlewares_validation/auth-middlewares";
import {blogValidation, nameValidation} from "../validators/blog-validation";
import {StatusCode} from "../models/common";
import {PostRepository} from "../repositories/post-repository";

export const testingRoute = Router({})


testingRoute.delete('/all-data', (req: Request, res: Response) => {
    try {
        BlogRepository.removeAllBlogs();
        PostRepository.removeAllPosts();
        res.sendStatus(StatusCode.NoContent_204);
    } catch (error) {
        console.error('Error resetting blogs:', error);
        console.error('Error resetting posts:', error);
        res.status(
            StatusCode.InternalServerError_500)
            .send(
                {error: 'Internal Server Error'});
    }
});