const request= require('supertest')
const app=require('../app')

const url_base='/api/v1/directors'
const directors={
    firstName:"Jose",
    lastName:"Abraham",
    nationality:"Bulgaro",
    image:"ramdon 32",
    birthday:"03-12-1970"
}
let directorsId
test("Get /directors should return status code 200 and body.length === 0",
async()=>{
    const res= await request(app)
    .get(url_base)

    expect(res.statusCode).toBe(200)
   
})
test("Post 'url_base' should staus code 201 and res.body.lastName === directors.lastName",
async()=>{
    const res= await request(app)
    .post(url_base)
    .send(directors)

    directorsId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.lastName).toBe(directors.lastName)
})
test("Put 'url_base/:id' should return status code 200 and res.body === bodyUpdate.lastName",
async ()=>{
    const bodyUpdate={
        lastName:"Juan"
    }
    const res= await request(app)

          .put(`${url_base}/${directorsId}`)
          .send(bodyUpdate)

          expect(res.statusCode).toBe(200)
          expect(res.body).toBeDefined()
          expect(res.body.lastName).toBe(bodyUpdate.lastName)
})
test("Delete 'url_base/directorsId' should return status 204", 
async()=>{
    const res=await request(app)
    .delete(`${url_base}/${directorsId}`)
    expect(res.status).toBe(204)

})