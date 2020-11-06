const { GraphQLServer } = require("graphql-yoga");
const posts = require('./data.json');

const PORT = 4000;

const typeDefs = `
    type Query {
        hello(name: String): String!
        post(postId: Int!): Post
        allPosts: [Post!]!
    }
    type Post {
        userId: Int
        id: ID,
        title: String
        body: String
    }
`;

const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name || 'World'}`,
        allPosts: () => posts,
        post: (_, { postId }) => posts.filter(post => post.id === postId)[0]
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log(`Server is running on localhost:${PORT}`));
