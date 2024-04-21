const request=require('supertest')
const app=require('../app')
const url_base="/api/v1/actors"
const actors={
    firstName:"John",
    lastName:"Moncada",
    nationality:"Ecuador",
    image:"random 32",
    birthday:"12-10-1990"
}
let actorsId

test("Get /actors should return status code 200 and body.length === 0",
async()=>{
    const res = await request(app)
       .get(url_base)
       expect(res.status).toBe(200)
       expect(res.body).toBeDefined()
     //  expect(res.body).toHaveLength(0)

})
test("Post 'url_base',should return status code 201 and res.body.lastName === actors.lastName",async()=>{
    const res= await request(app)
    .post(url_base)
    .send(actors)

    actorsId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.lastName).toBe(actors.lastName)
})
test("Put 'url_base/:id' should return status code 200 and res.body === bodyUpdate.lastName",
async ()=>{
    const bodyUpdate={
        lastName:"Juan"
    }
    const res= await request(app)

          .put(`${url_base}/${actorsId}`)
          .send(bodyUpdate)

          expect(res.statusCode).toBe(200)
          expect(res.body).toBeDefined()
          expect(res.body.lastName).toBe(bodyUpdate.lastName)
})
test("Delete 'url_base/actorsId' should return status 204", 
async()=>{
    const res=await request(app)
    .delete(`${url_base}/${actorsId}`)
    expect(res.status).toBe(204)

})
