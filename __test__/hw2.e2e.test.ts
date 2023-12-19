import request from 'supertest';
import {app} from '../src/settings'

describe("/testing", () => {
    beforeAll(async () => {
        await request(app).delete("/testing/all-data").expect(204);
    });

    it("Get status 200 and found empty array of blogs, posts", async () => {
        await request(app).get("/blogs").expect(200, [{
            id: '12345',
            name: 'string',
            description: 'eins, zwei, drei',
            websiteUrl: 'www.yandex.ru'
        },
            {
                id: '1',
                name: 'hello',
                description: 'vier, fünf, sechs',
                websiteUrl: 'www.google.com'
            }]);
      //  await request(app).get("/posts").expect(200, []);
    })


});