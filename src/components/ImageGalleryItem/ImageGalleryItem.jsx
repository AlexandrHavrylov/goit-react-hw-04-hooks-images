import React, { Component } from "react";
import { GalleryImg, StyledImageGalleryItem } from "./ImageGalleryItem.styled";

export class ImageGalleryItem extends Component {
  render() {
    return (
      <StyledImageGalleryItem>
        <GalleryImg
          onClick={() => {
            this.props.openModal(this.props.image);
          }}
          src={this.props.image.webformatURL}
          alt=""
        />
      </StyledImageGalleryItem>
    );
  }
}
