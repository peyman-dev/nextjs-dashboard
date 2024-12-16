"use client";
import classNames from "classnames";
import { Maximize2 } from "lucide-react";
import React, { useEffect, useRef } from "react";

export const ModalContext = React.createContext();

export const Modal = ({ children, className, ...props }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [ModalContent, setModalContent] = React.useState(null);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const modalRef = useRef();

  useEffect(() => {
    modalRef.current.scrollIntoView({ behavior: "smooth" });
  }, [modalRef]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const useFullscreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const modalCn = classNames(
    "relative p-5 overflow-y-auto bg-white rounded shadow-lg duration-150",
    {
      "w-full h-screen": isFullScreen,
      " w-[900px] max-h-[700px]": !isFullScreen,
    }
  );

  return (
    <ModalContext.Provider value={{ openModal, closeModal, setModalContent }}>
      <div
        onClick={closeModal}
        className={`w-full z-50 duration-100 h-screen fixed top-0 left-0 bg-black bg-opacity-20 flex items-center justify-center ${
          showModal ? "opacity-100 visible" : "hidden invisible"
        }`}
      >
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className={`${modalCn} ${className || ""}`}
          {...props}
        >
          {/* Close Button */}
          <div className="flex  text-gray-500 items-center justify-end gap-4">
            <button onClick={useFullscreen}>
              <Maximize2 className="size-4" />
            </button>
            <button onClick={closeModal} className="text-2xl">
              &times;
            </button>
          </div>
          {/* Dynamic Content */}
          {ModalContent}
        </div>
      </div>
      {/* Render Children */}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = React.useContext(ModalContext);

  return {
    openModal: context.openModal,
    closeModal: context.closeModal,
    setModalContent: context.setModalContent,
  };
};
