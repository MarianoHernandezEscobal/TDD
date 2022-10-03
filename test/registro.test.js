const request = require('supertest');
const { app, server } = require('../index');


afterEach(() => {
   server.close();
});

describe('Registro de usuarios', () => {

   test('Correcto registro de usuario', async () => {

      const data = {
         firstname: "prueba",
         lastname: "registro",
         birthdate: "30-01-2000",
         email: "ayrton@email.com",
         password: 123456,
         repitepassword: 123456
      }

      const { body, statusCode } = await request(app).post('/users').send(data);

      expect(statusCode).toBe(201);
      expect(body).toMatchObject({ ok:expect.any(Boolean),msg: expect.any(String) });
   });

   test('Error en repite password', async () => {

      const data = {
         firstname: "prueba",
         lastname: "registro",
         birthdate: "30-01-2000",
         email: "ayrton@email.com",
         password: 123456,
         repitepassword: 1234
      }

      const { body, statusCode } = await request(app).post('/users').send(data);

      expect(statusCode).toBe(400);
      expect(body).toMatchObject({ ok:expect.any(Boolean),msg: expect.any(String) });
   });

});