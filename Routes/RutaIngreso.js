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
    });
    res.status(201).json({ status: "Todo correcto" });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
