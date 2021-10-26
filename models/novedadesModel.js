var pool = require("./bd");

// listado
async function getNovedades() {
  var query = "select * from novedades";
  var rows = await pool.query(query);
  return rows;
}

//borarr
async function deleteNovedadesById(id) {
  var query = "delete from novedades where id = ?";
  var rows = await pool.query(query, [id]);
  return rows;
}

// insertar
async function insertNovedad(obj) {
  try {
    var query = "insert into novedades set ?";
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//modificar get by ID
async function getNovedadById(id) {
  var query = "select * from novedades where id = ?";
  var rows = await pool.query(query, [id]);
  return rows[0];
}

// modificar update
async function modificarNovedadById(obj, id) {
  try {
    var query = "update novedades set ? where id = ?";
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getNovedades,
  deleteNovedadesById,
  insertNovedad,
  getNovedadById,
  modificarNovedadById,
};
