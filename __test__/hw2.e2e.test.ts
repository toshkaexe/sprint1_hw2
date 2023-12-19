import request from 'supertest';
import {app} from '../src/settings'
import {StatusCode} from "../src/models/common";

describe("/testing", () => {
    beforeAll(async () => {
        await request(app).delete("/testing/all-data").expect(204);
    });

    it("+GET Blogs with no authorisation", async () => {
        await request(app).get("/blogs").expect(200, []);

    });
    it("+GET Posts with no authorisation", async () => {
        await request(app).get("/posts").expect(200, []);

    })

    it('+ GET blogs with incorrect id', async () => {
        const nonExistentId = 999;
        const response = await request(app).get(`/blogs/${nonExistentId}`);
        expect(response.status).toBe(404);
    });

    it('+ GET posts with incorrect id', async () => {
        const nonExistentId = 999;
        const response = await request(app).get(`/posts/${nonExistentId}`);
        expect(response.status).toBe(404);
    });


    it('POST new Blog', async () => {
        const newBlog = {
            name: 'Test Blog',
            description: 'This is a test blog',
            websiteUrl: 'https://example.com',
        };

        const response = await request(app)
            .post('/blogs')
            .send(newBlog)
            .auth("admin", "qwerty");

        expect(response.status).toBe(201);

    });

    it('PUT Blog by ID', async () => {
        const newBlog = {
            name: 'Test Blog',
            description: 'This is a test blog',
            websiteUrl: 'https://example.com',
        };

        const response = await request(app)
            .post('/blogs')
            .send(newBlog)
            .auth("admin", "qwerty");
        expect(response.status).toBe(201);
    });


    it('+PUT  posts with the empty body', async () => {
        const postsId = 1;
        const postBody = {};

        const response = await request(app).put(`/posts/${postsId}`)
            .auth("admin", "qwerty")
            .send(postBody);
        expect(response.status).toBe(StatusCode.BadRequest_400);
    });


});