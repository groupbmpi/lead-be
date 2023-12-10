require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lead-BE API',
      version: '1.0.0',
      description: `
This is the API documentation for Lead-BE. The Lead-BE API provides endpoints to interact with various features.

### Authentication
All endpoints require authentication using a JSON Web Token (JWT). Include the token in the "token" cookie.

### Servers
- Development: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT || 3000}
${process.env.NODE_ENV === 'production' ? `- Production: https://${process.env.SERVER_HOST}` : ''}
`,
    },
    servers: [
      {
        url: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT || 3000}`,
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
