const connectDB = require('./db')
const {ObjectId} = require('mongodb')


const getMovies = async () => {
    let db
    let movies = []

    try {
        db = await connectDB()
        movies = await db.collection('movies').find().toArray()
    } catch (error) {
        console.error(`${error}`)
    }

    return movies
}

const getMovie = async (root, { id }) => {
    let db
    let movie
    try {
        db = await connectDB()
        movie = await db.collection('movies').findOne({_id: ObjectId(id)})
    } catch (error) {
        console.error(error);
    }
    return movie
}

const getActors = async () => {
    let db
    let actors = []

    try {
        db = await connectDB()
        actors = await db.collection('actors').findOne().toArray()
    } catch (error) {
        console.error(`${error}`)
    }

    return actors
}

const getActor = async (root, {id}) => {
    let db
    let actor

    try {
        db = await connectDB()
        actor = await db.collection('actors').findOne({_id: ObjectId(id)})
    } catch (error) {
        console.error(`${error}`)
    }

    return actor
}

module.exports = {
    getMovies,
    getMovie,
    getActors,
    getActor,
}
