import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaUserCircle } from "react-icons/fa";
import logo from "../img/logo.png";
import backgroundImage from "../img/fondo_contacto.jpg";
import sideImage from "../img/img_log.jpg";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div
      className="login-page d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ padding: "0.75rem 1rem" }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center" style={{ fontSize: "24px" }}>
            <img src={logo} alt="PowerMove Logo" style={{ width: "30px", height: "30px", marginRight: "8px" }} />
            PowerMove
          </Link>
        </div>
      </nav>

      {/* Login Container */}
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="row shadow-lg rounded overflow-hidden" style={{ maxWidth: "800px", width: "100%" }}>
          {/* Columna Izquierda (Imagen) */}
          <div className="col-md-6 d-none d-md-block" style={{ backgroundImage: `url(${sideImage})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "400px" }}>
          </div>

          {/* Columna Derecha (Formulario) */}
          <div className="col-md-6 p-4" style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
            {/* Icono de usuario */}
            <div className="text-center mb-3">
              <FaUserCircle size={80} className="text-dark" />
            </div>

            <h2 className="text-center text-dark fw-bold">Inicia Sesión</h2>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <div className="input-group">
                  <span className="input-group-text"><FaUser /></span>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Ingrese su correo" 
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Ingrese su contraseña" 
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-warning w-100 fw-bold">Ingresar</button>
            </form>

            {/* Registro */}
            <hr className="my-4" />
            <div className="text-center">
              <p className="mb-2">¿Aún no tienes cuenta en PowerMove?</p>
              <Link to="/register" className="btn btn-success w-100 btn-hover-dark">Regístrate</Link>
              <p className="mt-2 text-muted" style={{ fontSize: "14px" }}>
                Al crear una cuenta, aceptas nuestros <Link to="/terms">Términos y Condiciones</Link> y nuestra <Link to="/privacy">Política de Privacidad</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-light text-center" style={{ padding: "0.75rem 1rem" }}>
        <p className="mb-0">&copy; {new Date().getFullYear()} PowerMove</p>
      </footer>

      <style jsx>{`
        .btn-hover-dark:hover {
          background-color: #0c6b29 !important; /* Verde más oscuro al hacer hover */
          color: white !important;
        }
      `}</style>
    </div>
  );
}

export default Login;
