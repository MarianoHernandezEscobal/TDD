describe('PUT /extraer/{id}', () => {
    test('Debe devolver un código de estado 200', async () => {

        const data = { id: 1, monto : 100};
        const { statusCode, body } = await request(app).put('/extraer/1').send(data);
        expect(statusCode).toBe(200);
     })

     test('Debe devolver un código de estado 404', async () => {

        const data = { id: 10, monto : 100};
        const { statusCode } = await request(app).put('/extraer/2555').send(data);
        expect(statusCode).toBe(404);
     })

     test('Debe devolver un código de estado 400', async () => {

        const data = { id: 10, monto : 100};
        const { statusCode } = await request(app).put('/extraer/1').send(data);
        expect(statusCode).toBe(400);
     })
  
})