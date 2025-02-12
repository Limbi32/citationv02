"use client";
// components/Modal.tsx
import React from "react";

interface ModalProps {
  Open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ConfirModal: React.FC<ModalProps> = ({ Open, onClose, children }) => {
  if (!Open) return null; // Si la modal n'est pas ouverte, on ne l'affiche pas
  console.log("open " + Open);
  console.log(onClose);

  return (
    <div
      className={` ${
        Open
          ? "fixed  top-15 right-15  rounded-xl  z-40  gap-4  shadow-lg bg-zinc-200 p-10"
          : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

export default ConfirModal;
