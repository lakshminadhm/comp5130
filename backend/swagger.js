const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CryptoNote API',
            version: '1.0.0',
            description: 'API documentation for the Secure Notes Sharing Application',
            contact: {
                name: 'Lakshmi Nadh Makkena',
                email: 'lakshminadh_makkena@student.uml.edu',
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: 'https://localhost:5000/api',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
