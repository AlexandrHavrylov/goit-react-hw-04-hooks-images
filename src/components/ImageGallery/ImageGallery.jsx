import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { ImagesGallery } from "./ImageGallery.styled";

export function ImageGallery({ images, openModal }) {
  return (
    <>
      <ImagesGallery>
        {images.map((image, index) => (
          <ImageGalleryItem key={index} image={image} openModal={openModal} />
        ))}
      </ImagesGallery>
    </>
  );
}
