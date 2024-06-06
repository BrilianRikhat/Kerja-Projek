const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { connectDB, closeDB, client } = require("./db/database");
const { ObjectId } = require('mongodb');


connectDB();

app.use(express.static("client"));
app.use(express.static("views"));
app.use(express.static("img"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get("/home", async (req,res)  => {
      res.render("home");
})

app.get("/about", async (req,res)  => {
      res.render("about")
})

app.get("/feedback-view", async (req,res)  => {
          res.render("feedback-view")
})

app.get("/portofolio", async (req,res)  => {
          res.render("portofolio")
})


app.get("/skills", async (req,res)  => {
    res.render("skills")
})

app.get("/login", async (req,res)  => {
    res.render("login")
})

app.get("/contact", async (req,res)  => {
    const {fname,lname,email,message,time}= req.body;
    const bd = await client.db("brilianD");
    const cd = await bd.collection("feedback");
    const db = await cd.find({}).toArray();
    console.log(db);
        res.render("contact", { db })
})

app.get("/minda", async (req,res) => {
    const {fname,lname,email,message,time}= req.body;
    const bd = await client.db("brilianD");
    const cd = await bd.collection("feedback");
    const db = await cd.find({}).toArray();
    res.render("minda", {db})
})

app.post("/contact", async (req,res) => {
    const {fname,lname,email,message,time}= req.body;
    const bd = await client.db("brilianD");
    const cd = await bd.collection("feedback");
    await cd.insertOne({fname,lname,email,message,time});
})

app.delete("/delete", async (req,res) => {
    const {user} = req.body;
    console.log(user);
    const db = await client.db("brilianD");
    const cl= await db.collection("feedback");
    const dl = await cl.deleteOne({_id: new ObjectId(user)});
    console.log(dl.deletedCount);
    res.json({user})
})

process.on('SIGINT', async () => {
    await closeDB();
    process.exit();
});


app.listen(port,() => {
    console.log(`berhasil masuk di port ${port}`);
})


