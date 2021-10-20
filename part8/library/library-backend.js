const {
  apolloserver,
  userinputerror,
  authenticationerror,
  gql,
} = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const book = require('./models/book');
const author = require('./models/author');
const user = require('./models/user');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) =>
    console.log(`Error connecting to MongoDB: ${error.message}`)
  );

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User

    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({
          author: author._id,
          genres: args.genre,
        }).populate('author', { name: 1, born: 1 });
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({ author: author._id }).populate('author', {
          name: 1,
          born: 1,
        });
      } else if (args.genre) {
        return await Book.find({ genres: args.genre }).populate('author', {
          name: 1,
          born: 1,
        });
      } else {
        return await Book.find({}).populate('author', { name: 1, born: 1 });
      }
    },
    allAuthors: async (root, args) => {
      return await Author.find({});
    },
    me: (root, args, context) => context.loggedUser,
  },

  Mutation: {
    addBook: async (root, args, { loggedUser }) => {
      if (!loggedUser) {
        throw new AuthenticationError('you need to be logged in to add a book');
      }
      const author = await Author.findOne({ name: args.author });
      const book = await Book.findOne({ title: args.title });
      if (book) {
        throw new UserInputError('book already exists', { invalidArgs: args });
      }

      if (!author) {
        const author = new Author({ name: args.author });
        const book = await new Book({ ...args, author: author._id }).populate(
          'author',
          { name: 1, born: 1 }
        );

        try {
          await author.save();
          await book.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }

        return book;
      } else {
        const book = await new Book({ ...args, author: author.id }).populate(
          'author',
          { name: 1, born: 1 }
        );
        try {
          await book.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
        return book;
      }
    },

    editAuthor: async (root, args, { loggedUser }) => {
      if (!loggedUser) {
        throw new AuthenticationError('you need to be logged in to add a book');
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new UserInputError('author not found', { invalidArgs: args });
      }
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
      return author;
    },

    createUser: async (root, { username, password, favoriteGenre }) => {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({ username, favoriteGenre, passwordHash });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return user;
    },

    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });
      const checkPassword = await bcrypt.compare(password, user.passwordHash);

      if (!(user && checkPassword)) {
        throw new UserInputError('invalid username or password', {
          invalidArgs: args,
        });
      }

      const token = jwt.sign(
        { username: user.username, id: user.id },
        process.env.SECRET
      );
      return { value: token };
    },
  },

  Author: {
    bookCount: async ({ name }) => {
      const author = await Author.findOne({ name });
      return Book.countDocuments({ author: author.id });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      const loggedUser = await User.findById(decodedToken.id);

      return { loggedUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
