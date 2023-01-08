import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const PORT = process.env.PORT || 5500;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory Browser API",
      version: "1.0.0",
      description: "Express Library API for Inventory Browser",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
  },
  apis: ["./routes/*.*"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));