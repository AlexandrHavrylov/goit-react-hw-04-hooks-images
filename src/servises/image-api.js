import axios from "axios";

async function fetchImage(imgToFind, page = 1) {
  const KEY = "22578709-fa6dea9b1a45e33c6082cdf73";
  const url = `https://pixabay.com/api/?q=${imgToFind}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(url);

  return response.data.hits;
}

export { fetchImage };

// useEffect(() => {
//   setStatus("pending");
//   fetchImage(image).then((imagesToGallery) => {
//     setImagesInGallery(imagesToGallery);
//     setStatus("resolved");
//   });
// }, [image]);

// useEffect(() => {
//   setStatus("pending");
//   fetchImage(image, page)
//     .then((imagesToGallery) => {
//       setImagesInGallery([...imagesInGallery, ...imagesToGallery]);
//       setStatus("resolved");
//     })
//     .then(
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: "smooth",
//       })
//     );
// }, [image, imagesInGallery, page]);
