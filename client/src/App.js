import React, { useRef, useState, useEffect } from 'react';
import './css/inicio.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// Importar componentes


// Importar imagenes
import maleta from './images/MALETA.png';
import pilar1 from './images/pilar1.jpeg';
import colegioActur from './images/colegioActur.jpeg';
import ocioActur from './images/ocioActur.jpeg';
import canguro from './images/canguro.jpg';
import { set } from 'mongoose';

function Inicio() {
    const comoFuncionaRef = useRef(null);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    
    const [userId, setUserId] = useState('');

    const [componenteMostrado, setComponenteMostrado] = useState('inicio');

    const [mostrarActividad, setMostrarActividad] = useState(false);

    const [actividades, setActividades] = useState([]);
    const [idActividad, setIdActividad] = useState('');

    const scrollToComoFunciona = () => {
        comoFuncionaRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const handleCabecera = (pantalla) => {
        console.log('Pantalla:', pantalla);
        if (pantalla === 'InicioCalidaz') {
            // setComponenteMostrado('Inicio');
            console.log('InicioCalidaz');
            setMostrarActividad(false);
        }
        else if (pantalla === 'InicioLogin') {
            togglePopup('Registro');
            console.log('InicioLogin');
            setMostrarActividad(false);
        }
    };

    const togglePopup = (componentToShow, userId) => {
        setMostrarPopup(!mostrarPopup);
        setComponenteMostrado(componentToShow);
        setUserId(userId);
    };

    const handleRegistroPopup = () => {
        togglePopup('Registro');
    }

    const handleMostrarActividad = (id) => () => {
        setIdActividad(id);
        setMostrarActividad(true);
    }
    
    useEffect(() => {
        // Función para obtener actividades del backend
        const obtenerActividades = async () => {
          try {
            const response = await fetch(`http://localhost:9000/activities`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
    
            if (response.ok) {
              const data = await response.json();
              console.log("DATA ES: ", data);
    
              // Verificar y procesar imágenes en cada actividad
              const actividadesConImagenes = data.map((actividad) => {
                if (actividad.imagenes && actividad.imagenes.length > 0) {
                  const imagenPromises = actividad.imagenes.map(async (imagen) => {
                    const imageBuffer = imagen.data;
                    const arrayBufferView = new Uint8Array(imageBuffer.data);
                    const blob = new Blob([arrayBufferView], { type: imagen.contentType });
                    const imageUrl = URL.createObjectURL(blob);
                    return { ...imagen, url: imageUrl };
                  });
    
                  return Promise.all(imagenPromises).then((imagenes) => ({
                    ...actividad,
                    imagenes: imagenes
                  }));
                } else {
                  return actividad;
                }
              });
    
              Promise.all(actividadesConImagenes).then((actividadesActualizadas) => {
                setActividades(actividadesActualizadas);
                console.log("Actividades: ", actividadesActualizadas);
              });
            } 
            else {
              console.error('Error al obtener actividades:', response.statusText);
            }
          } catch (error) {
            console.error('Error al obtener actividades:', error);
          }
        };
    
        // Llamar a la función para obtener actividades al cargar el componente
        obtenerActividades();
      }, []);

    if (componenteMostrado === 'InicioLogin') {
    }

    if (componenteMostrado === 'InicioAdmin') {
    }

    if (mostrarActividad) {
    }
    
    return (
        // <!-- CABECERA -->
        <div className='fondoPantalla'>


            {/* <div className="container"> */}
            
            <div className="row mt-5 align-items-center">
                <div className="col-md-6 text-center">
                    <h1>Al mudarte de Ziudad, que el desconocimiento no te pase factura</h1>
                </div>
                <div className="col-md-6 text-center">
                    <img src={maleta} alt="Imagen" className="img-fluid" />
                </div>
            </div>

            <div className="row mt-3 align-items-center mb-5">
                <div className="col-1 col-md-1"></div>
                <div className="col-2 col-md-1 text-center" onClick={scrollToComoFunciona}>
                    <div className="rounded-circle bg-white border border-dark p-3">
                        <i className="fas fa-arrow-right fa-2x text-dark"></i>
                    </div>
                </div>
                <div className="col-9 col-md-10" onClick={scrollToComoFunciona}>
                    <p className="mt-2 h3">Cómo funciona CalidaZ</p>
                </div>
            </div>

            <div ref={comoFuncionaRef}></div> {/* Referencia para hacer scroll */}

            <div className="row mt-3">
                {actividades.map((actividad, index) => (
                    <div className="col-4" key={index}>
                        <div className="rectangulo">
                            <img 
                                src={actividad.imagenes[0].url} 
                                className="img-fluid mx-auto d-block" 
                                alt="Imagen"
                                onClick={handleMostrarActividad(actividad._id)}
                            />
                            <p className="text-center mt-3">{actividad.nombre}</p>
                            <hr className="linea" />
                        </div>
                    </div>
                ))}
            </div>

            

            {/* <!-- Texto principal --> */}
            <div className="row mt-3">
                <div className="col-md-12">
                    <h1 className="text-center mb-3 mt-5">Cómo funciona CalidaZ</h1>
                    <p className="text-center px-md-3 h5">Calidaz se presenta como la solución ideal para aquellos que buscan mudarse a Zaragoza. Esta innovadora empresa te ofrece la posibilidad de descubrir cuál es el mejor barrio para establecerte, brindándote información valiosa sobre la seguridad, comodidades y estilo de vida que ofrece cada área.</p>
                </div>
            </div>

            {/* <!-- Botón "Hacer el testZ" --> */}
            <div className="row mt-3">
                <div className="col-md-12 text-center">
                <button onClick={handleRegistroPopup} className=" btn-test btn-lg">Hacer el testZ</button>
                </div>
            </div>

            {/* <!-- Testimonios --> */}
            <div className="row mt-5">
                <div className="col-md-12 text-center">
                    <h1>Testimonios</h1>
                </div>
            </div>

            {/* Testimonio 1 */}
            <div className="row mt-3 justify-content-end">
                <div className="col-md-12">
                    <div className="rectanguloTestimonio" style={{ maxWidth: "800px" }}>
                        <div className="row align-items-center">
                            <div className="col-md-8">
                                <div className="text-center">
                                    <p className="testimonio-text"><strong className="float-left">1</strong> Ana, 28 años:</p>
                                </div>
                                <p className="testimonio-text">Gracias a Calidaz, encontré el barrio perfecto en una ciudad nueva para mi trabajo. La información detallada sobre cada área hizo que mi mudanza fuera suave y sin sorpresas.</p>
                            </div>
                            <div className="col-md-4">
                                <img src={canguro} alt="Testimonio" className="img-fluid float-right" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonio 1 */}
            <div className="row mt-3 justify-content-end">
                <div className="col-md-12">
                    <div className="rectanguloTestimonio" style={{ maxWidth: "800px" }}>
                        <div className="row align-items-center">
                            <div className="col-md-8">
                                <div className="text-center">
                                    <p className="testimonio-text"><strong className="float-left">1</strong> Ana, 28 años:</p>
                                </div>
                                <p className="testimonio-text">Gracias a Calidaz, encontré el barrio perfecto en una ciudad nueva para mi trabajo. La información detallada sobre cada área hizo que mi mudanza fuera suave y sin sorpresas.</p>
                            </div>
                            <div className="col-md-4">
                                <img src={canguro} alt="Testimonio" className="img-fluid float-right" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        {/* </div> */}

        {/* <!-- PIE DE PÁGINA --> */}
        
    </div>
    );
}

export default Inicio;
