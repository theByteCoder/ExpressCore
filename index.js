const express = require('express');
const path = require('path');
const members = require('./Member')
const logger = require('./middlewire/logger')

const app = express();

const PORT = process.env.PORT || 5000;

// init middlewire
app.use(logger);

// set static folder using middlewire
app.use(express.static(path.join(__dirname, 'static')));

// get all members
app.get('/api/jsonresponse', (req, res) => res.json(members));

app.listen(PORT, () => {
    console.log(`Express server on PORT ${PORT}`);
});