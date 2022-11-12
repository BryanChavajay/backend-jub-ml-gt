const oficialModel = require("../Models/oficialModel");
const OficialModel = require("../Models/oficialModel");
const router = require("express").Router();

router.post("/oficial", async (req, res) => {
  try {
    const {
      nombre,
      DPI,
      NIT,
      Tipo,
      Banco,
      Cuenta,
      Servicio,
      Porcentaje,
      Pension,
      UltimoPago,
    } = req.body;
    const oficial = await OficialModel.create({
      nombre,
      DPI,
      NIT,
      Tipo,
      Banco,
      Cuenta,
      Servicio,
      Porcentaje,
      Pension,
      UltimoPago,
    });
    res.status(201).json({ status: "Todo correcto" });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.get("/estadisticas", async (req, res) => {
  try {
    const total = await oficialModel.count();
    const oficiales = await oficialModel.find({ Tipo: "Oficial" }).count();
    const especialistas = await oficialModel
      .find({ Tipo: "Especialista" })
      .count();
    res.status(200).json({ total, oficiales, especialistas });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
