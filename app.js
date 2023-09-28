const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const { UserRouter, MovieRouter } = require('./routes/index');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const port = 3000;


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


//sharing resource
app.use(cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));


app.use('/v1', UserRouter);
app.use('/v1', MovieRouter);

// Error handling middleware
// app.use((err, res) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
