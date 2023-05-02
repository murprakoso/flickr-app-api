/* eslint-disable no-unused-vars */
const request = require('supertest');

const app = require('../src/app');

describe('GET /api/photos', () => {
  it('responds with a json data', async () => {
    await request(app)
      .get('/api/photos')
      .timeout({ response: 10000 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('GET /api/photos/:id', () => {
  it('responds with a spesified json data by photo id', async () => {
    await request(app)
      .get('/api/photos/14965285782')
      .timeout({ response: 10000 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('GET /api/search?tags=:keyword', () => {
  it('responds with a spesified json data by keyword', async () => {
    await request(app)
      .get('/api/search?tags=dog')
      .timeout({ response: 10000 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('GET /api/feeds', () => {
  it('responds with a json data', async () => {
    await request(app)
      .get('/api/feeds')
      .timeout({ response: 10000 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        const photos = res.body;
        if (photos.success !== true) {
          throw new Error(
            // eslint-disable-next-line comma-dangle
            `Expected to be 'true', but got '${photos.success}'`
          );
        }
      });
  });
});
