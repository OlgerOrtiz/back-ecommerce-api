const supertest = require('supertest')
const app = require('../app');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
require('../models')


const BASE_URL_USERS = '/api/v1/users/login';
const BASE_URL_PRUCHASE = '/api/v1/purchase';
let TOKEN;
let userId;
let product;

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

test("POST -> 'BASE_URL_PURCHASE', should return status code 201 and res.body.quantity === body.quantity", async() =>{

    const productBody = {
        title: "iphone 12",
        description:"lorem12",
        price:"123.12"
    }

    product = await Product.create(productBody)

    const cartBody = {
        quantity: 3,
        userId,
        productId: product.id
    }

    await Cart.create(cartBody)

    const res = await supertest(app)
        .post(BASE_URL_PRUCHASE)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(201)
    expect(res.body[0].quantity).toBe(cartBody.quantity)
});

test("GET ALL -> 'BASE_URL_PURCHASE', should return status code 200 and res.body to have lengh === 1", async()=>{
    const res = await supertest(app)
        .get(BASE_URL_PRUCHASE)
        .set("Authorization", `Bearer ${TOKEN}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await product.destroy()
})
