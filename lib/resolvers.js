'use strict'
const {createMovie, createActor, editMovie, editActor, deleteActor, deleteMovie} = require('./mutation');
const {getMovie, getMovies, getActors, getActor} = require('./querys');

const resolvers = {
	Query: {
		getMovie,
		getMovies,
		getActors,
		getActor
	},
	Mutation: {
		createMovie,
		createActor,
		editMovie,
		editActor,
		deleteActor,
		deleteMovie,
	}
}

module.exports = { resolvers }
