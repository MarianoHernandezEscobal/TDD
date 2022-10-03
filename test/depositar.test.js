//import { bankDB } from '../src/data/productsDB';
//import { getProductByCategory, getProductById } from '../src/products';
const request = require('supertest');
const { app, server } = require('../index');

describe('PUT /deposito', () => {

    test('realizarDeposito tiene que validar que el monto final la suma del anterior mas el de transferencia', async () => {

        const data = {idUsuario : 1, montoTrans : 1956};
        
        const usuTransfer = await bankDB.Usuarios.findByPk(data.idUsuario);
        const { statusCode, body } = await request(app).put('/deposito/1').send(data);
        const usuPostTrans = await bankDB.Usuarios.findByPk(data.idUsuario);

        expect(statusCode).toBe(200);
        expect(usuTransfer.balance + data.montoTrans).toEqual(usuPostTrans.balance);
        
        // expect(product).toEqual({ id: 1, name: 'Fideos', category: 'alimentos' });
        // expect(product).not.toBeFalsy();

    });

    test('El monto de transferencia no puede ser mayor a un millon', () => {

        const data = {idUsuario : 1, montoTrans : 1000001};

        const { statusCode, body } = await request(app).put('/deposito/1').send(data);

        expect(statusCode).toBe(400);

    });

    test('El usuario no existe', async () => {

        const data = {idUsuario : 49};

        const usuTransfer = await bankDB.Usuarios.findByPk(data.idUsuario);

        const { statusCode, body } = await request(app).put(`/deposito/${data.idUsuario}`).send(data);

        expect(statusCode).toBe(400);

    });

});