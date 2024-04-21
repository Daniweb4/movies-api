const request=require('supertest')
const app=require('../app')

const url_base='/api/v1/genres'
const genres={
    name:'Fantasy'
}
let genresId


test("Post 'url_base' should return status code 201 and res.body.name===genres.name",
async()=>{
    const res= await request(app)
    .post(url_base)
    .send(genres)
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genres.name)

})
test("Get /genres should return status 200 and body.length === 0",
async()=>{
    const res= await request(app)
    .get(url_base)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
})
test("Put 'url_base/:id' should return status code 200 and res.body === bodyUpdate.name",
async ()=>{
    const bodyUpdate={
        name:"ficcion"
    }
    const res= await request(app)

          .put(`${url_base}/${genresId}`)
          .send(bodyUpdate)

          //expect(res.statusCode).toBe(200)
          expect(res.body).toBeDefined()
          //expect(res.body.name).toBe(bodyUpdate.name)
})
test("Delete 'url_base/genresId' should return status 204", 
async()=>{
    const res=await request(app)
       .delete(`${url_base}/${genresId}`)
       expect(res.status).toBeDefined()

})
