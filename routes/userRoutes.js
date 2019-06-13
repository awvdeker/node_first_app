const jsonfile = require("jsonfile");
const file_path = "./DB/users.json";

module.exports = app => {

  app.get("/users", (req, res) => {
    console.log("fetching all users");

    // jsonfile reading
    jsonfile.readFile("./DB/users.json", function(err, content) {
      // send file contents back to sender
      res.send(content);
    });
  });

  app.post("/users/new", (req, res) => {

    let { email, username } = req.body;

    jsonfile.readFile(file_path, function(err, content) {

      content.push({ email, username });

      console.log("added " + email + "to DB");

      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });

  app.delete("/users/destroy", (req, res) => {

    let email = req.body.email;

    jsonfile.readFile(file_path, function(err, content) {

      for (var i = content.length - 1; i >= 0; i--) {

        if (content[i].email === email) {
          console.log("removing " + content[i].email + "from DB");
          content.splice(i,1);
        }

      }

      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });


};
