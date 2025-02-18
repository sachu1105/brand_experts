import React from "react";
import { X } from "lucide-react";
import { useModal } from "../context/ModalContext";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";

export default function AuthModal() {
  const { activeModal, closeModal } = useModal();

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black" style={{ backgroundColor: "rgba(0, 0, 0, 0.60)" }} >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          {activeModal === "login" && <ModalLogin />}
          {activeModal === "register" && <ModalRegister />}
        </div>
      </div>
    </div>
  );
}
