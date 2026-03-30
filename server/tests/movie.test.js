const request = require('supertest')
const app = require('../index')


describe('GET /api/v2/cities -getCities', ()=>{
   test('should return 200 with cities', async()=>{
    const res = await request(app).get('/api/v2/cities');
    expect(res.statusCode).toBe(200);
   })
})

describe('GET /api/v2/:imdb?city=Delhi&date=today', ()=>{
    const imdbId= 'tt1517268'
    const today = new Date().toISOString().split('T')[0];
    test('should return 400 if city or date is missing', async()=>{
      const res = await request(app).get(`/api/v2/movies/${imdbId}/shows?date=${today}`);
      expect(res.statusCode).toBe(400);
    })
    test('should return 400 if city or date is missing', async()=>{
      const res = await request(app).get(`/api/v2/movies/${imdbId}/shows?city=Delhi`);
      expect(res.statusCode).toBe(400);
    })
    test('should return 200 with city, date and ImdbId correct', async()=>{
      const res = await request(app).get(`/api/v2/movies/${imdbId}/shows?city=Delhi&date=${today}`);
      expect(res.statusCode).toBe(200);
    })
})

describe('GET /api/v2/movies - getMoviesByImdb', () => {

  test('should return 400 if imdb is missing', async () => {
    const res = await request(app).get('/api/v2/movies');
    expect(res.statusCode).toBe(400)
  })


  test('should return 200 with movie details', async()=>{
    const imdbId= 'tt1517268'
    const res = await request(app).get(`/api/v2/movies/${imdbId}`);
    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBe(true)
  });
  

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