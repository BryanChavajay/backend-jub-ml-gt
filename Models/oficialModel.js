const mongoose = require("mongoose");

const oficialSchema = new mongoose.Schema({
  nombre: {
    type: String,
  },
  DPI: {
    type: String,
  },
  NIT: {
    type: String,
  },
  Tipo: {
    type: String,
  },
  Banco: {
    type: String,
  },
  Cuenta: {
    type: String,
  },
  Servicio: {
    type: Number,
  },
  Porcentaje: {
    type: String,
  },
  Pension: {
    type: Number,
  },
});

module.exports = mongoose.model("Oficial", oficialSchema);
