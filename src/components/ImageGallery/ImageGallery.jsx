import React, { Component } from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { ImagesGallery } from "./ImageGallery.styled";

export class ImageGallery extends Component {
  render() {
    return (
      <>
        <ImagesGallery>
          {this.props.images.map((image, index) => (
            <ImageGalleryItem
              key={index}
              image={image}
              openModal={this.props.openModal}
            />
          ))}
        </ImagesGallery>
      </>
    );
  }
}
