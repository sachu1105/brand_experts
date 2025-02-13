import React from "react";
import { X } from "lucide-react";
import { useModal } from "../context/ModalContext";
import Login from "../pages/loginSignin/Login";
import Register from "../pages/loginSignin/Register";

export default function AuthModal() {
  const { activeModal, closeModal } = useModal();

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={closeModal}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-lg max-w-md w-full mx-auto">
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-6">
            {activeModal === "login" && <Login isModal={true} />}
            {activeModal === "register" && <Register isModal={true} />}
          </div>
        </div>
      </div>
    </div>
  );
}
