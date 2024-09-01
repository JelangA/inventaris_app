const express = require("express");
const routes = require('./routes/indexRoutes');
const cors = require('cors');
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
require("dotenv").config();
const fileUpload = require('express-fileupload');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Hanya mengizinkan permintaan dari localhost:5173
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Metode HTTP yang diizinkan
    allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
  }));

// Use Helmet for security headers
app.use(helmet());

// Body parsing middleware
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

// Swagger route for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static("public"));//akses folder public

// Main API routes
app.use('/api', routes);

// Redirect root route
app.get('/', (req, res) => {
    res.redirect("https://mercusuar.uzone.id/");
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('External Server Error!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`API docs available at http://localhost:${port}/api-docs`);
});
