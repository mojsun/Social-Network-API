const { connect, connection } = require("mongoose");

connect("mongodb://localhost/SocialNetworlAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
