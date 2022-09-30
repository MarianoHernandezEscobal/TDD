const request = require('supertest');
describe('PUT /extraer/{id}', () => {
    test('Debe devolver un código de estado 200', async () => {

        const data = { id: 1, monto : 100};
        const usuinicial = db.Usuario.findPk(1);
        const { statusCode, body } = await request(app).put('/extraer/1').send(data);
        const usufinal = db.Usuario.findPk(1);
        expect(statusCode).toBe(200);
        expect(usuinicial.saldo - data.monto).toEqual(usufinal.sadlo);
     })

     test('Debe devolver un código de estado 404', async () => {

        const data = { id: 10, monto : 100};
        const { statusCode } = await request(app).put('/extraer/10').send(data);
        expect(statusCode).toBe(404);
     })

     test('Debe devolver un código de estado 400', async () => {

        const data = { id: 10, monto : 100};
        const { statusCode } = await request(app).put('/extraer/1').send(data);
        expect(statusCode).toBe(400);
     })
  
})