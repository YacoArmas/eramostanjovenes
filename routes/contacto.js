var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("contacto", {
    isContacto: true,
  });
});

router.post("/", async function (req, res, next) {
  var nombre = req.body.nombre;
  var email = req.body.email;
  var telefono = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to: "armasyaco@gmail.com",
    subject: "Contacto desde la web Eramos Tan Jovenes",
    html:
      nombre +
      " Se contacto y quiere mas informacion a este correo: " +
      email +
      " Ademas, hizo el siguiente comentario: " +
      mensaje +
      ". Su telefono es: " +
      telefono,
  };

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "38ad656675baef",
      pass: "606119055fb531",
    },
  });

  var info = await transport.sendMail(obj);

  res.render("contacto", {
    isContacto: true,
    message: "Mensaje enviado correctamente",
  });
});

module.exports = router;
