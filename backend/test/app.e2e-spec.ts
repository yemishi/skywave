import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/suggest-music (GET)', () => {
    return request(app.getHttpServer())
      .get('/suggest-music?city=Rio de Janeiro')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('track');
        expect(response.body).toHaveProperty('playlist');
        expect(response.body).toHaveProperty('temp');
        expect(response.body).toHaveProperty('feels_like');
        expect(response.body).toHaveProperty('temp_min');
        expect(response.body).toHaveProperty('temp_max');
        expect(response.body).toHaveProperty('pressure');
        expect(response.body).toHaveProperty('humidity');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('icon');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('country');
      });
  });
});
