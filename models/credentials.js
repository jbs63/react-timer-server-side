module.exports = {
  cookieSecret: 'your_cookie_secret',
  mongo: {
      development: {
        connectionString: 'mongodb+srv://jeffb246:S5aUb4XdLM8GFdwv@cluster0.ks6oqs0.mongodb.net/reacttimer?retryWrites=true&w=majority'
      },
      production: {
        connectionString: 'mongodb+srv://jeffb246:S5aUb4XdLM8GFdwv@cluster0.ks6oqs0.mongodb.net/?retryWrites=true&w=majority'
      },
  }
};