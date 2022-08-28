const express = require('express');
const bodyParser = require('body-parser')
const fleet = require('./routes/fleet')
const zones = require('./routes/zones')
const group = require('./routes/group')
const trips = require('./routes/trips')

const app = express();

// middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
// app.use(express.json({limit: '50mb'}))
// app.use(express.urlencoded({limit: '50mb'}))
app.use('/api/fleet', fleet)
app.use('/api/zones', zones)
app.use('/api/group', group)
app.use('/api/trips', trips)

const port = 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})