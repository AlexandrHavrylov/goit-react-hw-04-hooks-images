import { useEffect } from "react";
import { Overlay, ModalWindow } from "./Modal.styled";
import { createPortal } from "react-dom";

const modal = document.querySelector("#modal-root");

export function Modal({ onClose, img }) {
  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(null);
    }
  };

  useEffect(() => {
    const handeEscKeydown = (e) => {
      if (e.code === "Escape") {
        onClose(null);
      }
    };

    window.addEventListener("keydown", handeEscKeydown);
    return () => {
      window.removeEventListener("keydown", handeEscKeydown);
    };
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onOverlayClick}>
      <ModalWindow>
        <img src={img.largeImageURL} alt="" />
      </ModalWindow>
    </Overlay>,
    modal
  );
}
