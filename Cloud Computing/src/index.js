require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const routeUser = require("./routes/users");
const authentication = require("./routes/auth");
const child = require("./routes/anak");
const database = require("./models/database");
const middlewareLogs = require("./middleware/logs");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

// const connection = require("./database");


const app = express();

app.use(express.json());


// app.use(middlewareLogs.middle2);
// app.use(middlewareLogs.middle2);

// app.use("/users", routeUser);
const posts =[
    {
        username : 'Kyle',
        title : 'post 1'
    }
]
app.get('/posts', authenticateToken, (req, res)=>{
    res.json(posts.filter(post => post.username === req.user.name));
})

app.use("/signup", routeUser);

app.use("/profile", routeUser);

app.use("/anak", child);

app.use("/login", authentication);

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(PORT, () => {
  console.log(`Server berhasil di running di port ${PORT}`);
});
