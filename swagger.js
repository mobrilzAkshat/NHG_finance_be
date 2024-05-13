const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Nhg_Finance',
      version: '1.0.0',
      description: 'List of api`s for Nhg_finance',
    },
    basePath: '/',
  },
  // Path to the API docs
  apis: ['routes/*.js'], // Path to the API routes files (replace with your actual path)
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
