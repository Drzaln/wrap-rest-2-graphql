const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')

const baseURL = `https://api.hadith.sutanlab.id`

const resolvers = {
	Query: {
		books: () => {
			return fetch(`${baseURL}/books`).then((res) => res.json()).then((json) => {
				return json.data
			})
		},
		hadith: (parent, args) => {
			const { id, from, until } = args
			return fetch(`${baseURL}/books/${id}?range=${from}-${until}`).then((res) => res.json()).then((json) => {
				return json.data
			})
		},
		spesificHadith: (parent, args) => {
			const { id, number } = args
			return fetch(`${baseURL}/books/${id}/${number}`).then((res) => res.json()).then((json) => {
				return json.data
			})
		}
	}
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers
})

server.start(() => console.log('Run on http://localhost:4000'))
