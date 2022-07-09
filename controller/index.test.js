const app = require("../server/routes/index")
const request = require("supertest");

test('Test Health', async () => {
    const res = await request(app).get("/health") 

    expect(res.text).toEqual("Server is ON!")
})