import React, { Component } from "react";
import { Overlay, ModalWindow } from "./Modal.styled";
import { createPortal } from "react-dom";

const modal = document.querySelector("#modal-root");

export class Modal extends Component {
  handeEscKeydown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose(false);
    }
  };

  onOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose(false);
    }
  };
  componentDidMount() {
    window.addEventListener("keydown", this.handeEscKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handeEscKeydown);
  }

  render() {
    return createPortal(
      <Overlay onClick={this.onOverlayClick}>
        <ModalWindow>
          <img src={this.props.img.largeImageURL} alt="" />
        </ModalWindow>
      </Overlay>,
      modal
    );
  }
}
