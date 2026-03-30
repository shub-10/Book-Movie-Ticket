const request = require('supertest')
const app = require('../index')

describe('POST /api/v2/auth/signup -Signup', ()=>{
    test("should return 200", async()=>{

      const res = await request(app).post('/api/v2/auth/signup').send({
        username: 'testuser',
        password: 'test1234',
        confirmPassword: 'test1234'
      });
      expect(res.statusCode).toBe(200);
    })
    
})

describe('POST /api/v2/auth/login - Login', ()=>{
  test("should return 200 with token", async()=>{
    const res = await request(app).post('/api/v2/auth/login').send({
        username: 'testuser',
        password: 'test1234'
    })
    expect(res.statusCode).toBe(200);
  })
})