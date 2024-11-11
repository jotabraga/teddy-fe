import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  const closeOverlay = () => {
    if (onClose) onClose();
  };

  return (
    <div
      onClick={closeOverlay}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded shadow-lg max-w-sm w-full"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
