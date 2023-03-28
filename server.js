const express = require('express')
const router = require('./routes/signuproute')
const app = express()
const cors = require('cors')
const port = process.env.port || 8080;
var corOption = {
    origin: "http://localhost:8081",
};

app.use(cors(corOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", router);

app.get("", (req, res) => {
    res.json({ message: "hello from api" });
});

app.listen(port, () => {
    console.log(`server is listening to :-  http://localhost:${port}`);
});
