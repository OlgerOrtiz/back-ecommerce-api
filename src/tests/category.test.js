const supertest = require('supertest')
const app = require('../app')

const BASE_URL_USERS = '/api/v1/users/login'
const BASE_URL = '/api/v1/categories'
let categoryId;
let TOKEN;

beforeAll(async () => {
    const user = {
        email: "olgerortiz24@gmail.com",
        password: "12345"
    }
    const res = await supertest(app)
        .post(BASE_URL_USERS)
        .send(user)

    TOKEN = res.body.token
});

test("POST -> 'BASE_URL', should return status code 201 and res.body.name === body.name", async () => {
    const category = {
        name: "phone"
    }

    const res = await supertest(app)
        .post(BASE_URL)
        .send(category)
        .set("Authorization", `Bearer ${TOKEN}`)
    categoryId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(category.name)
});

test("GET ALL -> 'BASE_URL', should return status code 200 and res.body to have length 1", async () => {
    const res = await supertest(app)
        .get(BASE_URL)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test("DELETE -> 'BASE_URL/:id', should return status 204", async () => {
    const res = await supertest(app)
        .delete(`${BASE_URL}/${categoryId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
    expect(res.status).toBe(204)
})