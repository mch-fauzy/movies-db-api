const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const { UserRouter, MovieRouter } = require('./routes/index');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const port = 3000;
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

//sharing resource
app.use(cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL }))

app.use('/v1', UserRouter);
app.use('/v1', MovieRouter);

app.get('/home', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status(200).json('Welcome, your app is working well');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;