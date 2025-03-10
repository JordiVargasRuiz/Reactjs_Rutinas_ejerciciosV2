import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Agregar useLocation
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthRedirect = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ruta actual

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si está autenticado y quiere acceder a una ruta protegida, no lo redirige
        if (location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/") {
          navigate("/dashboard"); // Redirige al dashboard si está autenticado
        }
      } 
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, location]);

  if (loading) return null; // No renderiza nada mientras se verifica la autenticación

  return children;
};

export default AuthRedirect;
