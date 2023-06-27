const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')

const BASE_URL = '/api/v1/users'

test("GET -/> 'BASE_URL', should return status code 200 and res.body to have length 1", async()=>{
    const res = await supertest(app)
        .get(BASE_URL)
        // .set('Authotization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})