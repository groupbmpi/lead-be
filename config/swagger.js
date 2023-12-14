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
The Lead-BE API is a comprehensive tool for managing various aspects of an integrated platform. With endpoints covering Admin, Authentication, City, Instances, Mentor, Participant, Province, Registration, Task, Task Submission, Information Banners, Mentoring, and Dashboard functionalities, it offers a wide array of features for efficient system administration. The Lead-BE API, with its well-defined endpoints, is a powerful tool for managing the LEAD program API.

In the Admin section, you can create, retrieve, update, and delete administrators using specific endpoints. Authentication management is handled through login and logout endpoints for admins, participants, and mentors. City management allows you to retrieve information about all cities or a specific city by ID. Instances can be managed, checked, and updated based on optional filters, email status checks, or by specific IDs. Mentor and Participant sections provide endpoints for creating, retrieving, updating, and deleting mentors and participants. Province management allows you to obtain information about all provinces or a specific province by ID. Registration management includes endpoints for registering new users and sending registration confirmation emails. Task and Task Submission sections cover the creation, retrieval, update, and deletion of tasks and task submissions. Information Banners can be created, retrieved, updated, and deleted, with the additional feature of sending banner content via email.
The Mentoring section facilitates the creation, retrieval, update, and deletion of mentoring sessions. You can also retrieve mentorings by participant or mentor ID, or a combination of both. The Dashboard section provides a summary of the overall system through a dedicated endpoint.
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
