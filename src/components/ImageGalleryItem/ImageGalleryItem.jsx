import { GalleryImg, StyledImageGalleryItem } from "./ImageGalleryItem.styled";

export function ImageGalleryItem({ image, openModal }) {
  return (
    <StyledImageGalleryItem>
      <GalleryImg
        onClick={() => {
          openModal(image);
        }}
        src={image.webformatURL}
        alt=""
      />
    </StyledImageGalleryItem>
  );
}
