const supertest = require('supertest')
const app = require('../app');
const Category = require('../models/Category');
const Product = require('../models/Product');
require('../models')

const BASE_URL_USERS = '/api/v1/users/login'
let TOKEN;
let userId;
let category;
const BASE_URL_CART = '/api/v1/cart'
let product;
let cartId;

beforeAll(async () => {
    const user = {
        email: "olgerortiz24@gmail.com",
        password: "12345"
    }
    const res = await supertest(app)
        .post(BASE_URL_USERS)
        .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id
});

test("POST -> 'BASE_URL_CART', should return status code 201 and res.body.quantity === body.quantity", async () => {

    const categoryBody = {
        name: "tech"
    };

    category = await Category.create(categoryBody)

    const productBody = {
        title: "xiaomi 12",
        description: "lorem20",
        price: "999.99",
        categoryId: category.id

    }

    product = await Product.create(productBody)

    const cartBody = {
        quantity: 1,
        userId,
        productId: product.id
    }

    const res = await supertest(app)
        .post(BASE_URL_CART)
        .send(cartBody)
        .set('Authorization', `Bearer ${TOKEN}`)

    cartId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.quantity).toBe(cartBody.quantity)
})

test("GET ALL -> 'BASE_URL_CART', should return status code 200 and res.body to have length 1", async () => {
    const res = await supertest(app)
        .get(BASE_URL_CART)
        .set('Authorization', `Bearer ${TOKEN}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("PUT -> 'BASE_URL_CART', should return status code 201 and res.body.quantity === body.quantity", async () => {

    const cartBody = {
        quantity: 1
    }

    const res = await supertest(app)
        .put(`${BASE_URL_CART}/${cartId}`)
        .send(cartBody)
        .set('Authorization', `Bearer ${TOKEN}`)
    expect(res.status).toBe(200)
    expect(res.body.quantity).toBe(cartBody.quantity)
});

test("DELETE -> 'BASE_URL_CART', should return status code 201 and res.body.quantity === body.quantity", async () => {

    const res = await supertest(app)
        .delete(`${BASE_URL_CART}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
    expect(res.status).toBe(204)
    await product.destroy()
});