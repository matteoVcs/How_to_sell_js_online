const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const routesCrocs = require('./routes/crocs.js');

app.use(cors({
    origin: '*'
}))


app.use(routesCrocs);


app.listen(port, () => console.log(`listening on port ${port}`));