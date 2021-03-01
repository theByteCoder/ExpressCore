const express = require('express');
const path = require('path');
const moment = require('moment');
const members = require('./Member')

const app = express();

const PORT = process.env.PORT || 5000;

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} ${moment().format()}`);
    next();
}

// init middlewire
app.use(logger);

// set static folder using middlewire
app.use(express.static(path.join(__dirname, 'static')));

// get all members
app.get('/api/jsonresponse', (req, res) => res.json(members));

app.listen(PORT, () => {
    console.log(`Express server on PORT ${PORT}`);
});