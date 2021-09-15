import { useState, useEffect, useRef } from "react";
import { Button } from "../Button/Button";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Modal } from "../Modal/Modal";
import { Serachbar } from "../Searchbar/Serachbar";
import { Container, StyledLoader } from "./App.styled";
import { fetchImage } from "../../servises/image-api";

export function App() {
  const isFirstRender = useRef(true);
  const [imgInModal, setImgInModal] = useState(null);
  const [image, setImage] = useState("");
  const [page, setPage] = useState(1);
  const [imagesInGallery, setImagesInGallery] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetch = async () => {
      try {
        setStatus("pending");
        const imagesToGallery = await fetchImage(image, page);
        page === 1
          ? setImagesInGallery(imagesToGallery)
          : setImagesInGallery((state) => [...state, ...imagesToGallery]);

        setStatus("resolved");

        page === 1
          ? window.scrollTo({ top: 0, behavior: "smooth" })
          : window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
      } catch {
        setStatus("rejected");
      }
    };
    fetch();
  }, [image, page]);

  const handleGetImg = (image, page) => {
    setImage(image);
    setPage(page);
  };
  const handleModalOpen = (imgInModal) => {
    setImgInModal(imgInModal);
    setIsModalVisible(true);
  };

  const isVisible = imagesInGallery.length > 0;

  if (status === "idle" || "resolved") {
    return (
      <Container>
        <Serachbar onSubmit={handleGetImg} />;
        <ImageGallery images={imagesInGallery} openModal={handleModalOpen} />
        {isVisible && <Button onClick={setPage} page={page} />}
        {isModalVisible && (
          <Modal onClose={setIsModalVisible} img={imgInModal} />
        )}
      </Container>
    );
  }

  if (status === "pending") {
    return (
      <StyledLoader type="ThreeDots" color="#3f51b5" height={80} width={80} />
    );
  }

  if (status === "rejectd") {
    return <p>Ой, что то пошло не так</p>;
  }
}
