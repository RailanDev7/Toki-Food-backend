import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth-service",
      version: "1.0.0",
      description: "Documentação da API"
    },
    servers: [
      {
        url: "http://localhost:3001/api/v1"
      }
    ]
  },
  apis: ["./src/routes/**/*.ts"]
};

export const swaggerSpec = swaggerJsdoc(options);
