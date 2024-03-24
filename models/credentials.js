module.exports = {
  cookieSecret: 'your_cookie_secret',
  mongo: {
      development: {
        connectionString: 'mongodb+srv://jeffb246:S5aUb4XdLM8GFdwv@cluster0.ks6oqs0.mongodb.net/reacttimer?retryWrites=true&w=majority'
      },
      production: {
        connectionString: 'mongodb+srv://jeffb246:S5aUb4XdLM8GFdwv@cluster0.ks6oqs0.mongodb.net/?retryWrites=true&w=majority'
      },
  },
  google: {
      clientID: '25097725097-cosievqnipfm8hm246eqh8t1dm7t2cct.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'https://potential-waffle-p59v4w665pqf4vw-80.app.github.dev',
      project_id: 'capstone-project-416206',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      javascript_origins:['https://jbs63.github.io','https://react-timer-server-94999f41b89c.herokuapp.com','http://localhost:3000','http://localhost:80','http://localhost','https://potential-halibut-q56rj4xx5jw34q5j-3000.app.github.dev','https://potential-waffle-p59v4w665pqf4vw-80.app.github.dev']
  }
};