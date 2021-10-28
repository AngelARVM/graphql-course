'use strict'
const connectDB = require('./db')

const resolvers = {
	Query: {
		getMovies: async () => {
			let db
			let movies = []

			try {
				db = await connectDB()
				movies = await db.collection('movies').find().toArray()
			} catch (error) {
				console.error(`${error}`)
			}

			return movies
		},
		getMovie: (root, args) => {
			return movies.find(movie => movie._id === args.id)
		}
	}
}

module.exports = { resolvers }
