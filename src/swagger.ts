import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Food Delivery API",
    description: "API for a food delivery application",
    version: "1.0.0",
  },
  host: "localhost:3000",
  // basePath: "/api/v1",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Authentication",
      description: "User authentication endpoints",
    },
    {
      name: "Users",
      description: "User management endpoints",
    },
    {
      name: "Cart",
      description: "Shopping cart management endpoints",
    },
    {
      name: "Restaurants",
      description: "Restaurant management endpoints",
    },
    {
      name: "Menus",
      description: "Menu management endpoints",
    },
    {
      name: "Orders",
      description: "Order management endpoints",
    },
    {
      name: "Customers",
      description: "Customer management endpoints",
    },
    {
      name: "Reviews",
      description: "Review management endpoints",
    },
    {
      name: "Payments",
      description: "Payment integration endpoints",
    },
    {
      name: "Reports",
      description: "Dashboard and reports endpoints",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  definitions: {
    // TODO: add model definitions
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
