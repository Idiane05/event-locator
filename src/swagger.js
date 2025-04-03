// src/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Event Locator API',
            version: '1.0.0',
            description: 'API documentation for the Event Locator app',
        },
        servers: [
            {
                url: 'http://localhost:5000', // Update to your actual server URL if deployed
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

// Swagger UI setup
const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
