const supertest = require('supertest')
const app = require('../app')

const BASE_URL_CATEGORIES = '/api/v1/categories'
const BASE_URL = '/api/v1/products'
let TOKEN;

test("GET ALL -> 'BASE_URL', should return status code 200", async() => {})