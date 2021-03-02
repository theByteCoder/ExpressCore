const express = require('express');
const path = require('path');
const logger = require('./middlewire/logger')

const app = express();

const PORT = process.env.PORT || 5000;

// init middlewire
// app.use(logger);

// body parser middlewire
app.use(express.json());

// form submission middlewire
app.use(express.urlencoded({ extended: false }));

// set static folder using middlewire
app.use(express.static(path.join(__dirname, 'static')));

app.use('/api/members', require('./routes/api/member'))

app.listen(PORT, () => {
    console.log(`Express server on PORT ${PORT}`);
});