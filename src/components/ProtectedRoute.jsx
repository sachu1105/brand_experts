import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { useModal } from "../context/ModalContext";

export default function ProtectedRoute({ children }) {
  const { openModal } = useModal();

  if (!isAuthenticated()) {
    openModal("login");
    return <Navigate to="/cart" replace />;
  }

  return children;
}
