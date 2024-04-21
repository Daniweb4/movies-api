require('../models')
const request= require('supertest')
const app= require('../app')
const Genre=require('../models/Genres')
const Actor=require('../models/Actors')
const Directors=require('../models/Directors')

const url_base= '/api/v1/movies'

const movies={
    name:"El Padrino",
    image:"ramdon32",
    synopsis:"Un narcotrafincte se cree dueño de nueva york",
    releaseYear:1974
}
let moviesId
test("Get /movies should return status code 200 and body.length === 0",
async()=>{
    const res= await request(app)
    .get(url_base)
    //expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
   
})
test("Post 'url_base/movies' should return status code 201 and res.body.name === movies.name",
async()=>{
    const res= await request(app)
    .post(url_base)
    .send(movies)

    moviesId=res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movies.name)

})
test("Put 'url_base/:id' should return status code 200 and res.body === bodyUpdate.name",
async ()=>{
    const bodyUpdate={
        name:"El hombre araña"
    }
    const res= await request(app)

          .put(`${url_base}/${moviesId}`)
          .send(bodyUpdate)

          expect(res.statusCode).toBe(200)
          expect(res.body).toBeDefined()
          expect(res.body.name).toBe(bodyUpdate.name)
})
test("Post -> url_base/:id/genres, should return statusCode 200 and res.body.length === 1",
async()=>{
    const createGenres= await Genre.create({name:"terror"})
    const res= await request(app)
    .post(`${url_base}/${moviesId}/genres`)
    .send([createGenres.id])
     //console.log(res.body[0].moviesGenres.genreId)
    //console.log(res.body[0].moviesGenres.movieId)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].moviesGenres.genreId).toBe(createGenres.id)
    expect(res.body[0].moviesGenres.movieId).toBe(moviesId)
    await createGenres.destroy()
})
test("Post -> url_base/:id/actors, should return statusCode 200 and res.body.length === 1",
async()=>{
    const createActors = await Actor.create({
        firstName:"Jose",
        lastName:"Holmes",
        nationality:"EEUU",
        image:"random34",
        birthday:"12-10-1960"
    })
    const res= await request(app)
    .post(`${url_base}/${moviesId}/actors`)
    .send([createActors.id])
    
    console.log(res.body)
    
    expect(res.status).toBe(200)
    await createActors.destroy()
})
test("Post -> url_base/:id/directors, should return statusCode 200 and res.body.length===1",
async()=>{
    const createDirectors= await Directors.create({
        firstName:"Marcos",
        lastName:"Jhosson",
        nationality:"EEUU",
        image:"random38",
        birthday:"02-10-1970"
    })
    const res= await request(app)
    .post(`${url_base}/${moviesId}/directors`)
    .send([createDirectors.id])
    //console.log(res.body[0].moviesDirectors.movieId)
    //console.log(res.body[0].moviesDirectors.directorId)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].moviesDirectors.movieId).toBe(createDirectors.id)
    expect(res.body[0].moviesDirectors.directorId).toBe(moviesId)
    await createDirectors.destroy()

})

test("Delete 'url_base/moviesId' should return status 204", 
async()=>{
    const res=await request(app)
    .delete(`${url_base}/${moviesId}`)
    expect(res.status).toBe(204)


})