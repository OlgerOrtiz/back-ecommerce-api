const supertest = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/users'
let TOKEN;
let userId;

beforeAll(async()=>{
    const user = {
        email:"olgerortiz24@gmail.com",
        password:"12345"
    }
    const res = await supertest(app)
        .post(`${BASE_URL}/login`)
        .send(user)

    TOKEN = res.body.token
})

test("GET -/> 'BASE_URL', should return status code 200 and res.body to have length 1", async()=>{
    const res = await supertest(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("POST -> 'BASE_URL', ahould return status code 201 and res.body.firstName === body.firstName", async() =>{
    const user = {
        firstName: "Olger",
        lastName: "Ortiz",
        email: "olgerortiz23@gmail.com",
        password: "12345",
        phone: "+584242934812"
    }

    const res = await supertest(app)
        .post(BASE_URL)
        .send(user)
        userId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(user.firstName)
});

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.firstName === body.firstName", async() =>{
    const user = {
        firstName: "olger"
    }

    const res = await supertest(app)
        .put(`${BASE_URL}/${userId}`)
        .send(user)
        .set("Authorization", `Bearer ${TOKEN}`)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(user.firstName)
});

test("POST -> 'BASE_URL/login', should return status code 200 and res.body.email === body.email and token is Defined", async() => {
    const userLogin = {
        email: "olgerortiz23@gmail.com",
        password: "12345"
    }
    const res = await supertest(app)
        .post(`${BASE_URL}/login`)
        .send(userLogin)
    expect(res.status).toBe(200)
    expect(res.body.user.email).toBe(userLogin.email)
    expect(res.body.token).toBeDefined()
});

test("POST -> 'BASE_URL/login', should return status code 401", async() => {
    const userLogin = {
        email: "olgerortiz23@gmail.com",
        password: "invalid password"
    }
    const res = await supertest(app)
        .post(`${BASE_URL}/login`)
        .send(userLogin)
    expect(res.status).toBe(401)
});



test("DELETE -> 'BASE_URL/:id', should return status code 200", async() => {
    const res = await supertest(app)
        .delete(`${BASE_URL}/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
    expect(res.status).toBe(204)
});