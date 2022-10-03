const request = require('supertest');
const { app, server } = require('../index');


afterEach(() => {
   server.close();
});

describe('POST /user/login', () => {

   test('Login correcto Debe devolver el usuario logueado con el token y un status 200', async () => {

      const data = {
         "email": "ayrton@email.com",
         "password": 123456
      }

      const { body, statusCode } = await request(app).post('/users/login').send(data);

      expect(statusCode).toBe(200);
      expect(body).toMatchObject({ ok:expect.any(Boolean),msg: expect.any(String),token: expect.any(String) });
   })
   test('Email y password incorrecto Debe devolver un estado 400 he informar credenciales incorrectas', async () => {

    const data = {
       "email": "loginIncorrecto",
       "password": "passwordIncorrecto"
    }

    const { body, statusCode } = await request(app).post('/users/login').send(data);

    expect(statusCode).toBe(400);
    expect(body).toMatchObject({ ok:expect.any(Boolean),msg: expect.any(String)});
    })
    
    test('Email vacio, Debe devolver un estado 400 he informar credenciales incorrectas', async () => {

        const data = {
           "email": "",
           "password": "passwordIncorrecto"
        }
    
        const { body, statusCode } = await request(app).post('/users/login').send(data);
    
        expect(statusCode).toBe(400);
        expect(body).toMatchObject({ ok:expect.any(Boolean),msg: expect.any(String)});
    })
    test('password vacio, Debe devolver un estado 400 he informar credenciales incorrectas', async () => {

        const data = {
           "email": "ayrton@email.com",
           "password": ""
        }
    
        const { body, statusCode } = await request(app).post('/users/login').send(data);
    
        expect(statusCode).toBe(400);
        expect(body).toMatchObject({ ok:expect.any(Boolean),msg: expect.any(String)});
    })

   test('Debe devolver un estado 400 si no envian los datos y con un mensaje de error', async () => {
      const { statusCode, body } = await request(app).post('/users/login').send();
      expect(statusCode).toBe(400);
      expect(body).toEqual(expect.arrayContaining([
         expect.objectContaining({
            msg: expect.any(String)
         })
      ]));
   });
})
