import { useState, useEffect, useCallback } from 'react';
import FormularioContacto from './components/FormularioContacto';
import ListaContactos from './components/ListaContactos';
import './styles.css';

const API_URL = typeof window !== 'undefined' && window.location.protocol === 'https:'
  ? 'https://www.raydelto.org/agenda.php'
  : 'http://www.raydelto.org/agenda.php';

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const cargarContactos = useCallback(async () => {
    setCargando(true);
    setError('');

    try {
      const respuesta = await fetch(API_URL);
      if (!respuesta.ok) {
        throw new Error('No se pudo obtener la lista de contactos del servidor.');
      }
      const datos = await respuesta.json();
      if (Array.isArray(datos)) {
        setContactos(datos);
      } else {
        setContactos([]);
      }
    } catch (err) {
      setError(err.message || 'Error de conexion con el servidor.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarContactos();
  }, [cargarContactos]);

  const agregarContacto = async (nuevoContacto) => {
    setGuardando(true);
    setMensajeExito('');
    setError('');

    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoContacto)
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo guardar el contacto en el servidor.');
      }

      setMensajeExito('Contacto guardado exitosamente.');
      setContactos((prev) => [nuevoContacto, ...prev]);

      setTimeout(() => {
        setMensajeExito('');
      }, 4000);
    } catch (err) {
      setError(err.message || 'Error al guardar el contacto.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="aplicacion">
      <header className="cabecera-principal">
        <div className="contenedor cabecera-contenido">
          <h1 className="titulo-app">Agenda de Contactos</h1>
          <p className="subtitulo-app">Gestión y registro de contactos con React</p>
        </div>
      </header>

      <main className="contenedor contenido-principal">
        {mensajeExito && (
          <div className="alerta alerta-exito">
            {mensajeExito}
          </div>
        )}

        <div className="cuadricula-agenda">
          <section className="columna-formulario">
            <FormularioContacto
              onAgregarContacto={agregarContacto}
              guardando={guardando}
            />
          </section>

          <section className="columna-listado">
            <ListaContactos
              contactos={contactos}
              cargando={cargando}
              error={error}
              onRecargar={cargarContactos}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
