module.exports = {
  cookieSecret: 'your_cookie_secret',
  mongo: {
      development: {
        //connectionString: 'mongodb://127.0.0.1:27017/capstone?retryWrites=true&w=majority' // Uses localhost
        connectionString: 'mongodb+srv://jeffb246:S5aUb4XdLM8GFdwv@cluster0.ks6oqs0.mongodb.net/reacttimer?retryWrites=true&w=majority'
      },
      production: {
        //connectionString: 'mongodb://127.0.0.1:27017/capstone?retryWrites=true&w=majority'
        connectionString: 'mongodb+srv://jeffb246:S5aUb4XdLM8GFdwv@cluster0.ks6oqs0.mongodb.net/?retryWrites=true&w=majority'
      },
  },
  google: {
      clientID: '25097725097-cosievqnipfm8hm246eqh8t1dm7t2cct.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'https://didactic-space-computing-machine-vjw49r55jxg2wv4r-3000.app.github.dev/',
      project_id: 'capstone-project-416206',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      javascript_origins:['https://jbates246.github.io']
  }
};