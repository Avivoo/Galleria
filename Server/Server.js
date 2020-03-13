const express = require("express");
var cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const url = "mongodb+srv://avivcohen93:25nzh5TH@cluster0-nsojo.mongodb.net/DB";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("we are connected to DB!");
});

const Schema = mongoose.Schema;

const ArtSchema = new Schema({
  artistName: String,
  artName: String,
  email: String,
  description: String,
  price: String,
  source: String,
  regdate: Date
});
const Art = mongoose.model("Art", ArtSchema);

let artData = [];
async function getArts() {
  artData = await Art.find({}).sort({ regdate: -1 });
}
getArts();

app.post("/uploadArt", async (req, res) => {
  try {
    console.log(req.body.file);
    new Art({
      artistName: req.body.artistName,
      artName: req.body.artName,
      email: req.body.email,
      description: req.body.description,
      price: req.body.price,
      source: req.body.source,
      regdate: Date.now()
    }).save();
    await getArts();
    res.send({ valid: true });
  } catch {
    res.send({ valid: false });
  }
});

app.get("/onloadpage", (req, res) => {
  try {
    res.send(artData);
  } catch {
    res.send(error);
  }
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`were on port number ${port}`);
});

//-------------------------------------------------------------------------------//
//register
// app.post("/register", checkNotAuthenticated, async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     // console.log(req.body)
//
//     UsersModel.findOne({ userEmail: req.body.userEmail }, (err, docs) => {
//       if (err) {
//         console.log(err);
//       }
//       if (docs) {
//         if (docs.userName) {
//           res.send({ valid: false });
//         }
//       } else {
//         new UsersModel({
//           userRole: "client",
//           userFullname: req.body.fullname,
//           userPassword: hashedPassword,
//           userEmail: req.body.email,
//           regdate: new Date()
//         }).save();
//         res.send({ valid: true });
//       }
//     });
//   } catch {
//     res.redirect("/register");
//   }
// });
