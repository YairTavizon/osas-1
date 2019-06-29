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
      
      avatar: {
        required: "Este campo es requerido",
        type: String,
        default: '/img/proyect/customer.png'
      },
      email: {
        required: "Este campo es requerido",
        type: String
      },
      token: {
        required: "Este campo es requerido",
        type: String
      },
      perfil: {
        required: "Este campo es requerido",
        type: [String],
        enum: ['Turista', 'Conductor', 'Jefe', 'Colaborador'],
        default: 'Turista'
      },
      provider: {
        required: "Este campo es requerido",
        type: String,
        default: 'local'
      },
      coordUsuario: {
        type: Map,
        of: Number
      },
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


module.exports = mongoose.model('Usuario', Usuario );