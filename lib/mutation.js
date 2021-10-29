'use strict'

const connectDb = require('./db')
const {ObjectId} = require('mongodb')

const createMovie = async (root, {input}) => {
    const defaults = {
        title: '',
        genre: ''
    }

    const newMovie = Object.assign(defaults, input)

    let db
    let movie
    try {
        db =  await connectDb()
        movie = await db.collection('movies').insertOne(newMovie)
        newMovie._id = movie.insertedId
    } catch (error) {
        console.error(error)
    }

    return newMovie
}

const editMovie = async (root, {_id, input}) => {
    let db
    let movie

    try {
        db = await connectDb()
        const g = await db.collection('movies').updateOne({_id: ObjectId(_id)}, { $set: input})
        movie = await db.collection('movies').findOne({ _id: ObjectId(_id)})
    } catch (error) {
        console.error(error)
    }

    return movie
}

const deleteMovie = async (root, {_id}) => {
    let db
    let movie

    try {
        db = await connectDb()
        movie = await db.collection('movies').findOne({_id: ObjectId(_id)})
        await db.collection('movies').deleteOne({_id: ObjectId(_id)})
        return `${movie?.title} has been deleted from movies`
    } catch (error) {
        console.error(error)
    }
}

const createActor = async (root, {input}) => {
    const defaults = {
        email: '',
        gender: ''
    }

    const newActor = Object.assign(defaults, input)

    let db
    let actor
    
    try {
        db = await connectDb()
        actor = await db.collection('actors').insertOne(newActor)
        newActor._id = actor.insertedId
    } catch (error) {
        console.log(error)
    }
    return newActor
}

const editActor = async (root, {_id, input}) => {
    let db
    let actor

    try {
        db = await connectDb()
        await db.collection('actors').updateOne({ _id: ObjectId(_id)}, { $set: input})
        actor = await db.collection('actors').findOne({ _id: ObjectId(_id)})
    } catch (error) {
        console.error(error)
    }

    return actor
}

const deleteActor = async (root, {_id}) => {
    let db
    let actor

    try {
        db = await connectDb()
        actor = await db.collection('actors').findOne({ _id: ObjectId(_id)})
        await db.collection('actors').deleteOne({_id: ObjectId(_id)})
        return `${actor?.first_name} ${actor.last_name} has been deleted from actors`
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createMovie,
    editMovie,
    createActor,
    editActor,
    deleteActor,
    deleteMovie
}