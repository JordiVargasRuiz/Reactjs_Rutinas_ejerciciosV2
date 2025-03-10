import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBullseye, FaEye, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../img/logo.png"; 
import img1 from "../img/slide1.jpg"; 
import img2 from "../img/slide2.jpg";
import img3 from "../img/slide3.jpg";
import visionImg from "../img/vision.jpg"; 
import misionImg from "../img/mision.jpg"; 
import valoresImg from "../img/valor.jpg"; 
import nosotrosBg from "../img/fondo_nosotros.jpg";
import { FaUsers } from "react-icons/fa";


function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ padding: "0.75rem 1rem" }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center" style={{ fontSize: "24px" }}>
            <img src={logo} alt="PowerMove Logo" style={{ width: "30px", height: "30px", marginRight: "8px" }} />
            PowerMove
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="btn btn-dark" style={{ color: "white", border: "none", padding: "0.35rem 0.75rem", fontSize: "18px" }}>
                  Inicio
                </Link>
              </li>

              <li className="nav-item dropdown" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                <button className="btn btn-dark dropdown-toggle" style={{ color: "white", border: "none", padding: "0.35rem 0.75rem", fontSize: "18px" }} type="button">
                  Acceder
                </button>
                {showDropdown && (
                  <div className="dropdown-menu show" style={{ marginTop: "0px" }}>
                    <Link to="/login" className="dropdown-item">Iniciar sesión</Link>
                    <Link to="/register" className="dropdown-item">Registrarse</Link>
                  </div>
                )}
              </li>

              <li className="nav-item">
                <a href="#nosotros" className="btn btn-dark" style={{ color: "white", border: "none", padding: "0.35rem 0.75rem", fontSize: "18px" }}>
                  Nosotros
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Carrusel */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img1} className="d-block w-100" alt="Slide 1" style={{ maxHeight: "550px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src={img2} className="d-block w-100" alt="Slide 2" style={{ maxHeight: "550px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src={img3} className="d-block w-100" alt="Slide 3" style={{ maxHeight: "550px", objectFit: "cover" }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Sección Nosotros */}
      <section id="nosotros" className="py-5 text-center" style={{ padding: "50px 15px", backgroundImage: `url(${nosotrosBg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className="container" style={{ background: "rgba(255, 255, 255, 0.8)", padding: "30px", borderRadius: "10px" }}>
          <motion.h2 className="mb-4" style={{ fontSize: "32px", fontWeight: "bold" }} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <FaUsers className="me-2" color="#FFD700" /> Sobre Nosotros
          </motion.h2>
          <motion.p style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            En PowerMove, nos dedicamos a brindar soluciones innovadoras para mejorar tu bienestar y rendimiento físico.
            Nuestra misión es ofrecer herramientas que potencien tu actividad diaria y te ayuden a alcanzar tus objetivos.
          </motion.p>
          <div className="row mt-4">
            {[{ title: "Misión", icon: <FaBullseye color="red" />, img: misionImg, text: "Empoderar a las personas con tecnología avanzada para mejorar su rendimiento y bienestar." },
              { title: "Visión", icon: <FaEye color="blue" />, img: visionImg, text: "Ser líderes en innovación para el bienestar y el rendimiento físico a nivel global." },
              { title: "Valores", icon: <FaHeart color="green" />, img: valoresImg, text: "Innovación, compromiso, calidad y bienestar para nuestros usuarios." }].map((item, index) => (
              <motion.div key={index} className="col-md-4" whileHover={{ scale: 1.05 }}>
                <div className="card shadow-sm p-3">
                  <h4 className="mb-3">{item.icon} {item.title}</h4>
                  <p>{item.text}</p>
                  <img src={item.img} alt={item.title} className="img-fluid mt-3" style={{ maxHeight: "150px", objectFit: "cover", borderRadius: "10px" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* Sección Servicios */}
<section 
  id="servicios" 
  className="py-5 text-center position-relative" 
  style={{ backgroundImage: `url(${require("../img/fondo_servicios.jpg")})` }}

>
  <div className="container position-relative" style={{ zIndex: 2 }}>
    <motion.h2 
      className="mb-4 text-white fw-bold" 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }}
    >
      🏋️‍♂️ Servicios en PowerMove 🏋️‍♀️
    </motion.h2>
    <div className="row justify-content-center">
      {[
        {
          title: "Planes de Entrenamiento",
          icon: <FaBullseye color="red" size={24} />,
          description: "Planes personalizados para mejorar tu rendimiento físico, diseñados por expertos. Evaluamos tu condición física actual y diseñamos un programa específico para tus necesidades. Cada plan incluye rutinas progresivas, recomendaciones de ejercicios, estrategias para evitar lesiones y asesoramiento continuo para optimizar tu desempeño. Además, contarás con el seguimiento de profesionales que ajustarán tu plan a medida que avanzas, garantizando un óptimo desempeño y resultados efectivos.",
          image: require("../img/plan1.jpg")
        },
        {
          title: "Asesoramiento Nutricional",
          icon: <FaHeart color="green" size={24} />,
          description: "Recibe orientación nutricional basada en tus objetivos y necesidades específicas. Nuestros expertos en nutrición te proporcionarán planes alimenticios personalizados, adaptados a tus requerimientos energéticos y preferencias alimenticias. Aprenderás a equilibrar tu dieta, mejorar tu rendimiento y alcanzar un estilo de vida más saludable sin restricciones extremas. Además, contarás con seguimiento constante y ajustes en tu plan según tu evolución y necesidades.",
          image: require("../img/plan2.jpg")
        }
      ].map((servicio, index) => (
        <motion.div key={index} className="col-md-6 col-lg-5 mb-4" whileHover={{ scale: 1.05 }}>
          <div className="card shadow-lg p-4 rounded-4 bg-white text-dark">
            <h4 className="fw-bold">{servicio.icon} {servicio.title}</h4>
            <p className="text-muted">{expandedService === index ? servicio.description : "Descripción breve del servicio."}</p>
            {expandedService === index && (
              <img src={servicio.image} alt={servicio.title} className="img-fluid rounded mt-3" />
            )}
            <button className="btn btn-outline-primary mt-2 fw-bold" onClick={() => toggleService(index)}>
              {expandedService === index ? "Ver menos" : "Ver más"}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>

  <div 
    className="position-absolute top-0 start-0 w-100 h-100" 
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}
  ></div>
</section>

{/* Sección Contacto - PowerMove con imagen de fondo */}
<section id="contacto" className="py-5 text-dark position-relative" style={{
  backgroundImage: `url(${require("../img/fondo_contacto.jpg")})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
}}>
  <div className="container position-relative" style={{ zIndex: 2 }}>
    <div className="row">
      {/* Columna Izquierda - Información */}
      <div className="col-md-5">
        <div className="p-4 border rounded shadow-sm bg-white bg-opacity-75">
          <h4 className="fw-bold text-primary">Ubicación</h4>
          <p className="mb-1">AV MARIANO OTERO 3365, VERDE VALLE</p>
          <p className="mb-1">GUADALAJARA, JALISCO 44550</p>
          
          <h5 className="mt-3 text-primary">Horarios</h5>
          <p className="mb-1">Lun - Vie: 09:00 - 18:00</p>
          <p className="mb-1">Sábado: 09:00 - 14:00</p>
          <p className="mb-3">Domingo: Cerrado</p>

          {/* Redes Sociales */}
          <a href="https://www.facebook.com/TU_PAGINA" target="_blank" rel="noopener noreferrer" className="me-3 text-dark">
            <i className="bi bi-facebook fs-4"></i>
          </a>
          <a href="https://www.instagram.com/TU_PAGINA" target="_blank" rel="noopener noreferrer" className="text-dark">
            <i className="bi bi-instagram fs-4"></i>
          </a>

          {/* Mapa ajustado a la ubicación */}
          <div className="mt-3">
            <iframe
              title="Ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.3310238565136!2d-103.40027912457335!3d20.65182520314859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ac14cfc3298f%3A0x7b4f2a473d243b5f!2sAv.%20Mariano%20Otero%203365%2C%20Verde%20Valle%2C%2044550%20Guadalajara%2C%20Jal.%2C%20M%C3%A9xico!5e0!3m2!1sen!2sus!4v1709161303453!5m2!1sen!2sus"
              width="100%" height="200" style={{ border: "0", borderRadius: "8px" }} allowFullScreen
            ></iframe>
          </div>

          {/* Teléfono */}
          <h5 className="mt-3 text-primary">Contáctanos</h5>
          <p className="mb-0">
            <i className="bi bi-whatsapp text-success"></i> 33-14-58-73-61
          </p>
        </div>
      </div>

      {/* Columna Derecha - Formulario (Movido a la derecha) */}
      <div className="col-md-6 offset-md-1">
        <h2 className="fw-bold text-primary">¿Necesitas mejorar tu entrenamiento?</h2>
        <h4 className="mb-4 text-danger">¡PowerMove está aquí para ti!</h4>
        <p className="mb-4 text-dark">
          Nuestro equipo de expertos en fitness y bienestar te ayudará a alcanzar tus objetivos.  
          Agenda una consulta gratuita y transforma tu rutina de ejercicio hoy mismo.
        </p>

        {/* Formulario */}
        <form className="p-4 border rounded-3 shadow-sm bg-white bg-opacity-75">
          <h5 className="mb-3 text-primary">Déjanos tu mensaje</h5>
          <p><strong>Email:</strong> contacto@powermove.com</p>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Nombre" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Teléfono" required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Correo" required />
          </div>
          <div className="mb-3">
            <textarea className="form-control" rows="4" placeholder="Mensaje" required></textarea>
          </div>
          <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#007BFF", fontWeight: "bold" }}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

<footer className="text-white py-5" style={{ backgroundColor: "#181818" }}>
  <div className="container">
    <div className="row">
      
      {/* Columna 1: Logo y descripción */}
      <div className="col-md-4 mb-4">
        <h4 className="fw-bold text-light">PowerMove</h4>
        <p className="text-secondary">Eleva tu entrenamiento con guías personalizadas y asesoramiento experto.</p>
      </div>

      {/* Columna 2: Enlaces Rápidos */}
      <div className="col-md-4 mb-4">
        <h5 className="text-warning mb-3">Navegación</h5>
        <ul className="list-unstyled">
          <li>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="btn btn-link text-white text-decoration-none"
            style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
          >
            Inicio
          </button>

          </li>
          <li><a href="#servicios" className="footer-link">Servicios</a></li>
          <li><a href="#contacto" className="footer-link">Contacto</a></li>
        </ul>
      </div>

      {/* Columna 3: Redes Sociales y Contacto */}
      <div className="col-md-4 mb-4">
        <h5 className="text-warning mb-3">Conéctate con nosotros</h5>
        <div className="d-flex gap-3">
          <a href="https://www.facebook.com/TU_PAGINA" className="social-icon">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.instagram.com/TU_PAGINA" className="social-icon">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
        <p className="mt-3 text-secondary"><i className="bi bi-envelope text-primary"></i> contacto@powermove.com</p>
        <p className="text-secondary"><i className="bi bi-whatsapp text-success"></i> 33-14-58-73-61</p>
      </div>

    </div>

    {/* Separador */}
    <hr className="border-secondary opacity-25" />

    {/* Derechos de Autor */}
    <div className="text-center text-secondary">
      <p className="mb-0">&copy; {new Date().getFullYear()} PowerMove. Todos los derechos reservados.</p>
    </div>
  </div>

  {/* Estilos Personalizados */}
  <style jsx>{`
    .footer-link {
      color: #bbb;
      text-decoration: none;
      transition: color 0.3s;
    }
    .footer-link:hover {
      color: #ffc107;
    }
    .social-icon {
      font-size: 1.5rem;
      color: #bbb;
      transition: transform 0.3s ease-in-out, color 0.3s;
    }
    .social-icon:hover {
      transform: scale(1.2);
      color: #ffc107;
    }
  `}</style>
</footer>
    </>
  );
}

export default Navbar;
