import { useState, useMemo } from 'react';

export default function ListaContactos({ contactos, cargando, error, onRecargar }) {
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const contactosFiltrados = useMemo(() => {
    const termino = busqueda.toLowerCase().trim();
    if (!termino) return contactos;

    return contactos.filter((contacto) => {
      const nombre = (contacto.nombre || '').toLowerCase();
      const apellido = (contacto.apellido || '').toLowerCase();
      const telefono = (contacto.telefono || '').toLowerCase();
      return (
        nombre.includes(termino) ||
        apellido.includes(termino) ||
        telefono.includes(termino)
      );
    });
  }, [contactos, busqueda]);

  const totalPaginas = Math.ceil(contactosFiltrados.length / elementosPorPagina) || 1;

  const contactosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * elementosPorPagina;
    return contactosFiltrados.slice(inicio, inicio + elementosPorPagina);
  }, [contactosFiltrados, paginaActual, elementosPorPagina]);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const manejarCambioBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  return (
    <div className="tarjeta listado-contenedor">
      <div className="cabecera-listado">
        <div>
          <h2 className="titulo-seccion">Listado de Contactos</h2>
          <span className="contador-etiqueta">
            {contactosFiltrados.length} {contactosFiltrados.length === 1 ? 'contacto' : 'contactos'}
          </span>
        </div>

        <div className="controles-listado">
          <input
            type="text"
            className="entrada-texto entrada-busqueda"
            placeholder="Buscar por nombre, apellido o teléfono..."
            value={busqueda}
            onChange={manejarCambioBusqueda}
          />
          <button
            type="button"
            className="boton boton-secundario"
            onClick={onRecargar}
            disabled={cargando}
          >
            Actualizar
          </button>
        </div>
      </div>

      {cargando && (
        <div className="estado-mensaje estado-cargando">
          Cargando contactos...
        </div>
      )}

      {error && !cargando && (
        <div className="alerta alerta-error">
          <span>{error}</span>
          <button
            type="button"
            className="boton-enlace"
            onClick={onRecargar}
          >
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && contactosFiltrados.length === 0 && (
        <div className="estado-mensaje estado-vacio">
          No hay contactos para mostrar.
        </div>
      )}

      {!cargando && !error && contactosFiltrados.length > 0 && (
        <>
          <div className="contenedor-tabla">
            <table className="tabla-contactos">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {contactosPaginados.map((contacto, indice) => (
                  <tr key={`${contacto.nombre}-${contacto.apellido}-${indice}`}>
                    <td className="celda-destacada">{contacto.nombre || '-'}</td>
                    <td>{contacto.apellido || '-'}</td>
                    <td className="celda-telefono">{contacto.telefono || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPaginas > 1 && (
            <div className="paginacion">
              <button
                type="button"
                className="boton-paginacion"
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
              >
                Anterior
              </button>
              <span className="texto-paginacion">
                Página {paginaActual} de {totalPaginas}
              </span>
              <button
                type="button"
                className="boton-paginacion"
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
