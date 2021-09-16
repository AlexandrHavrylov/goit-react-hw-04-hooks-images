import { useState, useEffect, useRef } from "react";
import { Button } from "../Button/Button";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Modal } from "../Modal/Modal";
import { Serachbar } from "../Searchbar/Serachbar";
import { Container, StyledLoader } from "./App.styled";
import { fetchImage } from "../../servises/image-api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const isFirstRender = useRef(true);
  const [imgInModal, setImgInModal] = useState(null);
  const [image, setImage] = useState("");
  const [page, setPage] = useState(1);
  const [imagesInGallery, setImagesInGallery] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetch = async () => {
      if (image.trim()) {
        try {
          setStatus("pending");
          const imagesToGallery = await fetchImage(image, page);
          if (imagesToGallery.length === 0) {
            throw new Error();
          }
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
          setImagesInGallery([]);
          toast.error("По вашему запросу ничего не найдено");
        }
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
  };

  const isVisible = imagesInGallery.length > 0;

  if (status === "idle" || "resolved") {
    return (
      <Container>
        <Serachbar onSubmit={handleGetImg} />;
        <ImageGallery images={imagesInGallery} openModal={handleModalOpen} />
        {isVisible && <Button onClick={setPage} page={page} />}
        {imgInModal && <Modal onClose={setImgInModal} img={imgInModal} />}
        <ToastContainer />
      </Container>
    );
  }

  if (status === "pending") {
    return (
      <StyledLoader type="ThreeDots" color="#3f51b5" height={80} width={80} />
    );
  }
}
