const request = require('supertest');
describe('PUT /extraer/{id}', () => {
    test('Debe devolver un código de estado 200, controla que se realice la extraccion y que tenga saldo suficiente', async () => {

        const data = { id: 1, monto : 100};
        const usuinicial = db.Usuario.findPk(1);
        expect (usuinicial.balance > data.monto).toEqual(true);
        const { statusCode, body } = await request(app).put('/extraer/1').send(data);
        const usufinal = db.Usuario.findPk(1);
        expect(statusCode).toBe(200);
        expect(usuinicial.balance - data.monto).toEqual(usufinal.balance);
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