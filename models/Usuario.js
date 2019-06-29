const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nombre: {
      required: "Este campo es requerido",
      type: String
    },
    apellidos: {
      required: "Este campo es requerido",
      type: String
    },
    email: {
      required: "Este campo es requerido",
      type: String
    },
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

/**  => perfil

  Turista => Puede realizar viajes a cualquier parte de la republica y pagar sus viajes
  Conductor => Puede realizar y armar viajes con su propio vehiculo, siendo este mismo el conductor
  Jefe => Puede realizar y armar viajes con uno o más vehiculos, siendo este no el conductor si no un tercero

 */


module.exports = mongoose.model('Usuario', Usuario );