const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//Variable de entorno que contiene la dirección y el puerto del frontend
const frontend = process.env.FRONTEND;

//Conection with MongoDBAtlas
const uri = process.env.URIMONGOATLAS;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

//Configuración de Middleware
//origin: es para configurar quienes pueden acceder a nuestro server
app.use(
  cors({
    origin: [frontend],
    methods: ["GET", "POST"], //Para configurar el tipo de peticiones
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//Rutas
app.use("/", authRoutes);

app.listen(5000, () => {
  console.log("Server started in port 5000");
});
