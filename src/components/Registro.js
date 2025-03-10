import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaUserCircle } from "react-icons/fa";
import logo from "../img/logo.png";
import backgroundImage from "../img/fondo_contacto.jpg";
import sideImage from "../img/img_reg.jpg";

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !surname || !phone || !email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        surname: surname,
        phone: phone,
        email: email,
      });

      navigate("/login");
    } catch (error) {
      let errorMessage = "Hubo un error. Intenta de nuevo.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Correo electrónico inválido.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "El correo ya está en uso.";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña debe tener al menos 6 caracteres.";
          break;
        default:
          errorMessage = error.message;
      }
      setError(errorMessage);
    }
  };

  return (
    <div
      className="register-page d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ padding: "0.75rem 1rem" }}>
        <div className="container-fluid">
          <a href="/Reactjs_Rutinas_ejerciciosV2" className="navbar-brand d-flex align-items-center" style={{ fontSize: "24px" }}>
            <img src={logo} alt="PowerMove Logo" style={{ width: "30px", height: "30px", marginRight: "8px" }} />
            PowerMove
          </a>
        </div>
      </nav>

      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="row shadow-lg rounded overflow-hidden" style={{ maxWidth: "900px", width: "100%" }}>
          <div className="col-md-5 d-none d-md-block" style={{ backgroundImage: `url(${sideImage})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "450px" }}>
          </div>

          <div className="col-md-7 p-4 text-center" style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
            <FaUserCircle size={60} className="text-dark mb-2" />
            <h2 className="text-center text-dark fw-bold">Registro</h2>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            <form onSubmit={handleRegister}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaUser /></span>
                    <input type="text" className="form-control" placeholder="Nombre" onChange={(e) => setName(e.target.value)} required />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Apellido</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaUser /></span>
                    <input type="text" className="form-control" placeholder="Apellido" onChange={(e) => setSurname(e.target.value)} required />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Teléfono</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaPhone /></span>
                    <input type="text" className="form-control" placeholder="Teléfono" onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaEnvelope /></span>
                    <input type="email" className="form-control" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <input type="password" className="form-control" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </div>
              <div className="mb-3 text-center text-muted">
                <small>
                  Al crear tu cuenta, aceptas nuestros{" "}
                  <a href="/terms" className="text-decoration-none">términos y condiciones</a> y nuestra{" "}
                  <a href="/privacy" className="text-decoration-none">política de privacidad</a>.
                </small>
              </div>
              <button type="submit" className="btn btn-warning w-100 fw-bold">Registrarse</button>
            </form>

            <hr className="my-4" />
            <div className="text-center">
              <p className="mb-2">¿Ya tienes cuenta?</p>
              <a href="/Reactjs_Rutinas_ejerciciosV2/login" className="btn btn-success w-100 btn-hover-dark">Inicia sesión aquí</a>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-light text-center" style={{ padding: "0.75rem 1rem" }}>
        <p className="mb-0">&copy; {new Date().getFullYear()} PowerMove</p>
      </footer>
    </div>
  );
}

export default Register;
