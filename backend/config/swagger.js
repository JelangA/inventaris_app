const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
    },
    apis: ['./routes/documentation/*.js'], // Jalur relatif dari file config/swagger.js ke folder route/
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
