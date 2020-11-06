const { GraphQLServer, PubSub } = require("graphql-yoga");
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
    type Mutation {
        addPost(userId: Int, title: String!, body: String!): Post
    }
    type Subscription {
        counter: Counter
    }
    type Counter {
        count: Int!
    }
`;

const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name || 'World'}`,
        allPosts: () => posts,
        post: (_, { postId }) => posts.filter(post => post.id === postId)[0]
    },
    Mutation: {
        addPost: (_, { userId, title, body }) => {
            // adding post

            return {
                id: 999,
                userId,
                title,
                body
            };
        }
    },
    Subscription: {
        counter: {
            subscribe: (parent, args, { pubsub }) => {
                let count = 0;
                
                setInterval(() => pubsub.publish("test", { counter: { count: count++ } }), 2000);

                return pubsub.asyncIterator("test");
            }
        }
    }
}

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

server.start(() => console.log(`Server is running on localhost:${PORT}`));
