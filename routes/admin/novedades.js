var express = require("express");
var router = express.Router();
var novedadesModel = require("../../models/novedadesModel");

/* GET home page. */
router.get("/", async function (req, res, next) {
  // var novedades = await novedadesModel.getNovedades();
  var novedades;
  if (req.query.q === undefined) {
    novedades = await novedadesModel.getNovedades();
  } else {
    novedades = await novedadesModel.buscarNovedades(req.query.q);
  }

  res.render("admin/novedades", {
    layout: "admin/layout",
    usuario: req.session.nombre,
    novedades,
    is_search: req.query.q !== undefined,
    q: req.query.q,
  });
});

/* Eliminar Novedades */
router.get("/eliminar/:id", async (req, res, next) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedadesById(id);
  res.redirect("/admin/novedades");
});

// agregar novedades => diseño

router.get("/agregar", (req, res, next) => {
  res.render("admin/agregar", {
    layout: "admin/layout",
  });
});

// agregar
router.post("/agregar", async (req, res, next) => {
  try {
    if (
      req.body.titulo != "" &&
      req.body.subtitulo != "" &&
      req.body.cuerpo != ""
    ) {
      await novedadesModel.insertNovedad(req.body);
      res.redirect("/admin/novedades");
    } else {
      res.render("admin/agregar", {
        layout: "admin/layout",
        error: true,
        message: "Todos los campos son requeridos",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/agregar", {
      layout: "admin/layout",
      error: true,
      message: "Algo ha salido mal",
    });
  }
});

// modificar => get
router.get("/modificar/:id", async (req, res, next) => {
  var id = req.params.id;
  //console.log(req.params.id);
  var novedad = await novedadesModel.getNovedadById(id);

  res.render("admin/modificar", {
    layout: "admin/layout",
    novedad,
  });
});

// modificar => update
router.post("/modificar", async (req, res, next) => {
  try {
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
    };
    console.log(obj);

    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect("/admin/novedades");
  } catch (error) {
    console.log(eror);
    res.render("admin/modificar", {
      layout: "admin/layout",
      error: true,
      message: "Ocurrio un problema, no se ha podido modificar",
    });
  }
});

module.exports = router;
