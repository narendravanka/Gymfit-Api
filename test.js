var jwt = require("jsonwebtoken");
// var privateKey = fs.readFileSync("private.key");
// var token = jwt.sign({ foo: "bar" }, privateKey, { algorithm: "RS256" });
var msg = "Narendra babu";
console.log(msg);
var token = jwt.sign(msg, "shhhhh");
console.log(token);

var decoded = jwt.verify(token, "shhhhh");
console.log(decoded);
