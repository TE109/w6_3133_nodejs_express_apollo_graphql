const Movie = require('./models/Movie');

const resolver = {
    Query: {
        movies: async (parent, args, contextValue, info) => {
            return await Movie.find()
        },
        movie: async (_, { id }) => {
            return await Movie.findById(id)
        }
    },
    Mutation: {
        addMovie: async (_, args) => {
            const newMovie = new Movie({
                ...args
            })

            const movie = await newMovie.save()
            return movie
        },

        updateMovie: async (_, args) => {
            const { id, ...updateFields } = args
            const updatedMovie = await Movie.findOneAndUpdate(
                { _id: id }, 
                updateFields,
                { new: true })
            return updatedMovie
        },
        deleteMovie: async (_, { id }) => {
            const delMovie = await Movie.findOneAndDelete({ _id: id });
            return delMovie
        }
    }
}

module.exports = resolver;