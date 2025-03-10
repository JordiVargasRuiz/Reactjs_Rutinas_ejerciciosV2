import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar } from "react-bootstrap";
import { FaTrashAlt, FaPlusCircle, FaArrowCircleUp, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { FaDumbbell, FaClock, FaPlus, FaSignOutAlt, FaTrash, FaCogs, FaMedal, FaUser } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import logo from "../img/logo.png"; // Asegúrate de tener la ruta correcta
import backgroundImage from "../img/fondo_contacto.jpg"; // Asegúrate de tener la ruta correcta
import "./Challenges.css"; // Estilos personalizados

const Challenges = () => {
  const [user, setUser] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [newChallenge, setNewChallenge] = useState("");
  const [newDays, setNewDays] = useState(7); // Días predeterminados
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchChallenges(currentUser.uid);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchChallenges = async (userId) => {
    const querySnapshot = await getDocs(collection(db, "challenges"));
    const challengesData = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((challenge) => challenge.userId === userId);
    setChallenges(challengesData);
  };

  const addChallenge = async () => {
    if (newChallenge.trim() === "") return;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + newDays);

    await addDoc(collection(db, "challenges"), {
      text: newChallenge,
      userId: user.uid,
      target: 100,
      progress: 0,
      days: newDays,
      startDate: startDate,
      endDate: endDate,
    });
    setNewChallenge("");
    setNewDays(7);
    fetchChallenges(user.uid);
  };

  const deleteChallenge = async (id) => {
    await deleteDoc(doc(db, "challenges", id));
    fetchChallenges(user.uid);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Cierra sesión
      navigate("/login"); // Redirige al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };
  

  const updateProgress = async (id, challenge) => {
    let newProgress = Math.min(challenge.progress + 10, 100); // No exceder 100%
    
    const challengeRef = doc(db, "challenges", id);
    await updateDoc(challengeRef, { progress: newProgress });
    fetchChallenges(user.uid);
  };

  if (!user) {
    return <h2 className="text-center mt-5">Debes estar logueado para ver tus desafíos.</h2>;
  }

  return (
    <div
      className="challenges-page d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        {/* Barra de Navegación */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ padding: "0.75rem 1rem" }}>
          <div className="container-fluid">
            <a href="/Reactjs_Rutinas_ejerciciosV2/dashboard" className="navbar-brand d-flex align-items-center" style={{ fontSize: "24px" }}>
              <img src={logo} alt="PowerMove Logo" style={{ width: "30px", height: "30px", marginRight: "8px" }} />
              PowerMove
            </a>

            {/* Contenedor con los enlaces alineados a la derecha */}
            <div className="navbar-nav ms-auto">
              {/* Enlace Inicio */}
              <a href="/Reactjs_Rutinas_ejerciciosV2/dashboard" className="nav-link text-white">
                Inicio
              </a>

              {/* Enlace Desafíos */}
              <a href="/Reactjs_Rutinas_ejerciciosV2/challenges" className="nav-link text-white">
                Desafíos
              </a>
            </div>

            {/* Dropdown Menu */}
            {user && (
              <div className="dropdown">
                <button
                  className="btn btn-dark dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUser className="me-2" />
                  {user.email}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <a className="dropdown-item" href="/profile">Mi Perfil</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" />
                      Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>

      {/* Main Content */}
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center py-5">
        <div className="row shadow-lg rounded overflow-hidden" style={{ maxWidth: "1000px", width: "100%" }}>
          <div className="col-md-12 p-5 text-center" style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
            <h2 className="text-dark fw-bold mb-4">Mis Desafíos</h2>
            <p className="text-dark mb-4">
              Bienvenido, <strong>{user.email}</strong>. ¡Aquí puedes gestionar tus desafíos personales!
            </p>

            {/* Formulario para agregar nuevo desafío */}
            <div className="row justify-content-center mb-4">
              <div className="col-12 col-md-6">
                <div className="input-group shadow-sm mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nuevo desafío"
                    value={newChallenge}
                    onChange={(e) => setNewChallenge(e.target.value)}
                    aria-label="Nuevo desafío"
                  />
                  
                  {/* Selector de días entre 1 y 100 */}
                  <div className="input-group-append">
                    <input
                      type="range"
                      className="form-range"
                      min="1"
                      max="100"
                      value={newDays}
                      onChange={(e) => setNewDays(parseInt(e.target.value))}
                      aria-label="Días para el desafío"
                    />
                    <span className="ml-2 text-muted">{newDays} días</span>
                  </div>

                  <button
                    className="btn btn-lg btn-success text-white rounded-end shadow"
                    onClick={addChallenge}
                  >
                    <FaPlusCircle /> Agregar
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de desafíos */}
            <div className="row">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="col-12 col-md-4 mb-4">
                  <div className="card shadow-lg rounded-3 border-light">
                    <div className="card-body">
                      <h5 className="card-title text-center">{challenge.text}</h5>
                      <p className="card-text"><FaCalendarAlt /> <strong>Objetivo:</strong> {challenge.target}%</p>
                      <p className="card-text"><FaUserAlt /> <strong>Días:</strong> {challenge.days}</p>
                      
                      {/* Barra de progreso con colores personalizados */}
                      <ProgressBar
                        now={challenge.progress}
                        max={challenge.target}
                        label={`${Math.round(challenge.progress)}%`}
                        className="mb-3"
                        variant={challenge.progress < 30 ? "danger" : challenge.progress < 70 ? "warning" : "info"}
                      />

                      {/* Botones de acción */}
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-info btn-lg"
                          onClick={() => updateProgress(challenge.id, challenge)}
                        >
                          <FaArrowCircleUp /> Avanzar
                        </button>
                        <button
                          className="btn btn-danger btn-lg"
                          onClick={() => deleteChallenge(challenge.id)}
                        >
                          <FaTrashAlt /> Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} PowerMove</p>
      </footer>
    </div>
  );
};

export default Challenges;
