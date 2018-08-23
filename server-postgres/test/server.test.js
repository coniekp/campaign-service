const request = require('supertest');
const { connection } = require('../../db/index');
const app = require('../index.js');

describe('Test /', () => {
  test('should return status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    connection.end();
  });
});
