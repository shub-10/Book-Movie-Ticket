const request = require('supertest');
const app = require('../index.js');
const Show = require('../Models/show.model');

describe('GET /api/v2/show', ()=>{
  test('should return 404 if showId is missing', async()=>{

    const res = await request(app).get('/api/v2/show/invalidshow');
    expect(res.statusCode).toBe(500);
  })
})
describe('GET /api/v2/show', ()=>{
  test('should return 200 with showId', async()=>{
    const show = await Show.findOne();

    const res = await request(app).get(`/api/v2/show/${show._id}`);
    expect(res.statusCode).toBe(200);
  })
})