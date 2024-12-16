"use client"
import React from "react";

export const ModalContext = React.createContext();

export const Modal = ({ children, ...props }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <div onClick={closeModal} className={`w-full duration-100 h-screen fixed top-0 left-0 bg-black bg-opacity-20 flex items-center justify-center ${showModal ? "opacity-100 visible" : "hidden invisible"}`}>
        <div className="w-[900px] p-5 bg-white rounded shadow-lg" {...props}></div>
      </div>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = React.useContext(ModalContext);

  return {
    openModal: context.openModal,
    closeModal: context.closeModal
  } 
  
}