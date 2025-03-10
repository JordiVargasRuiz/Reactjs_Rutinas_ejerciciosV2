import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { FaDumbbell, FaClock, FaPlus, FaSignOutAlt, FaTrash, FaCogs, FaMedal, FaUser } from "react-icons/fa";
import logo from "../img/logo.png";
import backgroundImage from "../img/fondo_contacto.jpg";
import AuthRedirect from "../components/AuthRedirect";

function Dashboard() {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [exercises, setExercises] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRoutinesRef = collection(db, "users", currentUser.uid, "routines");
        const unsubscribeData = onSnapshot(userRoutinesRef, (snapshot) => {
          setExercises(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribeData();
      } else {
        navigate("Reactjs_Rutinas_ejerciciosV2/dashboard");
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const addExercise = async (e) => {
    e.preventDefault();
    if (!user) return alert("Debes iniciar sesión para registrar una rutina");

    if (exercise && duration) {
      const durationInt = parseInt(duration);

      if (durationInt <= 0) {
        return alert("La duración debe ser un valor positivo.");
      }

      await addDoc(collection(db, "users", user.uid, "routines"), {
        name: exercise,
        duration: durationInt,
        createdAt: new Date(),
      });
      
      setExercise("");
      setDuration("");
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const deleteExercise = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "routines", id));
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("Reactjs_Rutinas_ejerciciosV2/dashboard");
  };

  return (
    <AuthRedirect>
      <div 
        className="dashboard-page"
        style={{
          display: "flex", 
          flexDirection: "column", 
          minHeight: "100vh", 
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center"
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
              <a href="/challenges" className="nav-link text-white">
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

        {/* Contenedor Principal */}
        <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: "60px", flexGrow: 1 }}>
          <div className="col-12 col-md-8">
            {/* Tarjetas Informativas */}
            <div className="row mb-3">
              <div className="col-12 col-md-4 mb-3">
                <div className="card shadow-sm p-4 text-center" style={{ backgroundColor: '#fffae6', borderLeft: '5px solid #ffcc00' }}>
                  <FaMedal size={50} color="#ffcc00" />
                  <h5>Total Ejercicios</h5>
                  <p className="fs-4">{exercises.length}</p>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-3">
                <div className="card shadow-sm p-4 text-center" style={{ backgroundColor: '#e6f7ff', borderLeft: '5px solid #66b3ff' }}>
                  <FaClock size={50} color="#66b3ff" />
                  <h5>Duración Total</h5>
                  <p className="fs-4">{exercises.reduce((acc, ex) => acc + ex.duration, 0)} min</p>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-3">
                <div className="card shadow-sm p-4 text-center" style={{ backgroundColor: '#e0f7e6', borderLeft: '5px solid #33cc33' }}>
                  <FaCogs size={50} color="#33cc33" />
                  <h5>Promedio por Ejercicio</h5>
                  <p className="fs-4">{exercises.length > 0 ? (exercises.reduce((acc, ex) => acc + ex.duration, 0) / exercises.length).toFixed(1) : 0} min</p>
                </div>
              </div>
            </div>

            {/* Formulario de Registro */}
            <div className="card shadow-lg p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "8px" }}>
              <h2 className="text-center mb-3">Registrar Rutina</h2>
              <form onSubmit={addExercise}>
                <div className="mb-3">
                  <label className="form-label">Ejercicio</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaDumbbell /></span>
                    <input type="text" className="form-control" placeholder="Ejercicio" value={exercise} onChange={(e) => setExercise(e.target.value)} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Duración (min)</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaClock /></span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Duración"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                      min="1"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-warning w-100"><FaPlus /> Agregar</button>
              </form>

              <hr className="my-4" />
              <h3 className="text-center">Historial</h3>
              <div className="overflow-auto" style={{ maxHeight: exercises.length > 3 ? "120px" : "none", overflowY: exercises.length > 3 ? "auto" : "visible" }}>
                <ul className="list-group">
                  {exercises.map((ex) => (
                    <li key={ex.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {ex.name} - {ex.duration} min
                      <button className="btn btn-danger btn-sm" onClick={() => deleteExercise(ex.id)}>
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="bg-dark text-light text-center py-3 mt-auto"
          style={{
            fontSize: "16.5px",
            width: "100%",
            backgroundColor: "#343a40",
          }}
        >
          <div className="container-fluid">
            <p className="mb-0">&copy; {new Date().getFullYear()} PowerMove</p>
          </div>
        </footer>
      </div>
    </AuthRedirect>
  );
}

export default Dashboard;

