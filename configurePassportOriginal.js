const passport = require("passport");
const Strategy = require("passport-local").Strategy;

/*
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
  new Strategy(function (username, password, cb) {
    console.log("strategy", username, password);
    db.users.findByUsername(username, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


*/

const usersMap = new Map();

const usuario = {
  id: "john",
  username: "john",
  password: "clave",
};

usersMap.set(usuario.username, usuario);

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
  new Strategy(function (username, password, cb) {
    console.log("strategy", username, password);

    if (usersMap.has(username)) {
      const user = usersMap.get(username);
      if (user.password != password) {
        console.log("wrong password");
        return cb(null, false);
      }
      console.log("found user");
      return cb(null, user);
    } else {
      console.log("user not found");
      return cb(null, false);
    }
  })
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
  if (usersMap.has(username)) {
    cb(null, usersMap.get(username));
  } else {
    cb(new Error("User serialized not found"));
  }
});

const configurePassport = (app) => {
  // Use application-level middleware for common functionality, including
  // logging, parsing, and session handling.
  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(
    require("express-session")({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
    })
  );
  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = configurePassport;
