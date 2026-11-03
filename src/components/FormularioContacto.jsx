import { useState } from 'react';

export default function FormularioContacto({ onAgregarContacto, guardando }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errorLocal, setErrorLocal] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();

    const nombreLimpio = nombre.trim();
    const apellidoLimpio = apellido.trim();
    const telefonoLimpio = telefono.trim();

    if (!nombreLimpio || !apellidoLimpio || !telefonoLimpio) {
      setErrorLocal('Todos los campos son obligatorios.');
      return;
    }

    setErrorLocal('');
    onAgregarContacto({
      nombre: nombreLimpio,
      apellido: apellidoLimpio,
      telefono: telefonoLimpio
    });

    setNombre('');
    setApellido('');
    setTelefono('');
  };

  const limpiarFormulario = () => {
    setNombre('');
    setApellido('');
    setTelefono('');
    setErrorLocal('');
  };

  return (
    <div className="tarjeta formulario-contenedor">
      <h2 className="titulo-seccion">Nuevo Contacto</h2>

      {errorLocal && (
        <div className="alerta alerta-error">
          {errorLocal}
        </div>
      )}

      <form onSubmit={manejarEnvio} className="formulario">
        <div className="grupo-campo">
          <label htmlFor="nombre" className="etiqueta">Nombre</label>
          <input
            id="nombre"
            type="text"
            className="entrada-texto"
            placeholder="Ingrese el nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={guardando}
            required
          />
        </div>

        <div className="grupo-campo">
          <label htmlFor="apellido" className="etiqueta">Apellido</label>
          <input
            id="apellido"
            type="text"
            className="entrada-texto"
            placeholder="Ingrese el apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            disabled={guardando}
            required
          />
        </div>

        <div className="grupo-campo">
          <label htmlFor="telefono" className="etiqueta">Teléfono</label>
          <input
            id="telefono"
            type="tel"
            className="entrada-texto"
            placeholder="Ingrese el teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            disabled={guardando}
            required
          />
        </div>

        <div className="acciones-formulario">
          <button
            type="submit"
            className="boton boton-primario"
            disabled={guardando}
          >
            {guardando ? 'Guardando...' : 'Guardar Contacto'}
          </button>
          <button
            type="button"
            className="boton boton-secundario"
            onClick={limpiarFormulario}
            disabled={guardando}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}
