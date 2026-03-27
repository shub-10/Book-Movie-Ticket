const request = require('supertest')
const app = require('../index')
const Movie = require('../Models/movie.model');

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

describe('GET /api/v2/cities -getCities', ()=>{
   test('should return 200 with cities', async()=>{
    const res = await request(app).get('/api/v2/cities');
    expect(res.statusCode).toBe(200);
   })
})
describe('GET /api/v2/movies - getMoviesByCity', () => {

  test('should return 400 if city is missing', async () => {
    const res = await request(app).get('/api/v2/movies');
    expect(res.statusCode).toBe(400)
  })

  test('should return 200 with movies', async()=>{
    const res = await request(app).get('/api/v2/movies?city=Delhi');
    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.Movies)).toBe(true)
  });
  

})