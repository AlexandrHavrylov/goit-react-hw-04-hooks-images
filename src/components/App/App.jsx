import React, { Component } from "react";
import Button from "../Button/Button";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Modal } from "../Modal/Modal";
import { Serachbar } from "../Searchbar/Serachbar";
import { Container, StyledLoader } from "./App.styled";
import { fetchImage } from "../../servises/image-api";

export class App extends Component {
  state = {
    imgInModal: null,
    image: "",
    page: 1,
    imagesInGallery: [],
    isModalVisible: false,
    status: "idle",
  };

  async componentDidUpdate(_, prevState) {
    const { image, page } = this.state;
    const pageChange = prevState.page !== page;
    const imageChange = image.trim() && prevState.image !== image;

    try {
      if (imageChange) {
        this.setState({
          status: "pending",
        });

        const imagesInGallery = await fetchImage(image);
        this.setState({
          imagesInGallery,
          status: "resolved",
        });
      }

      if (pageChange) {
        this.setState({
          status: "pending",
        });

        const imagesInGallery = await fetchImage(image, page);

        this.setState((prevState) => ({
          imagesInGallery: [...prevState.imagesInGallery, ...imagesInGallery],
          status: "resolved",
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    } catch {
      this.setState({
        status: "rejected",
      });
    }
  }

  getImage = (image) => {
    this.setState({
      image,
    });
  };

  onLoadMore = (page) => {
    this.setState({
      page,
    });
  };

  handleModalOpen = (imgInModal) => {
    this.setState({
      imgInModal,
      isModalVisible: true,
    });
  };

  modalClose = (value) => {
    this.setState({
      isModalVisible: value,
    });
  };

  render() {
    const { imagesInGallery, imgInModal, isModalVisible, status } = this.state;

    const isVisible = imagesInGallery.length > 0;

    if (status === "idle") {
      return <Serachbar onSubmit={this.getImage} />;
    }

    if (status === "resolved") {
      return (
        <Container>
          <Serachbar onSubmit={this.getImage} />;
          <ImageGallery
            images={imagesInGallery}
            openModal={this.handleModalOpen}
          />
          {isVisible && (
            <Button onClick={this.onLoadMore} page={this.state.page} />
          )}
          {isModalVisible && (
            <Modal onClose={this.modalClose} img={imgInModal} />
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
}
