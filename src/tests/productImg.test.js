const request = require('supertest')
const app = require('../app')
const path = require('path')
require('../models')

const BASE_URL_USERS = '/api/v1/users/login'
const BASE_URL = '/api/v1/product_images'
let TOKEN
let productImgId;

beforeAll(async () => {
    const user = {
        email: "olgerortiz24@gmail.com",
        password: '12345'
    }

    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(user)

    TOKEN = res.body.token
});

test("POST -> 'BASE_URL_USERS', should return status code 201, res.body.url to be defined and res.body.filename to be defined", async () => {
    const imagePath = path.join(__dirname, '..', 'public', 'Slide1-1.jpg')

    const res = await request(app)
        .post(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)
        .attach('image', imagePath)

    productImgId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.url).toBeDefined()
    expect(res.body.filename).toBeDefined()
});

test("GET -> 'BASE_URL_PRODUCT_IMG', sholud status code 200 and res.body.length === 1", async () => {

    const res = await request(app)
        .get(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

});

test("DELETE -> 'BASE_URL/:productImgId', should return status code 204", async () => {

    const res = await request(app)
        .delete(`${BASE_URL}/${productImgId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)

})