import express from "express";
import data from "./data.js";

const app = express(); // express() returns an express object

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`serving at port http://localhost:${port}`));