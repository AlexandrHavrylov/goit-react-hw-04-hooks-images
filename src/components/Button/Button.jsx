import { Btn } from "./Button.styled";

export function Button({ onClick, page }) {
  const handeClick = () => {
    const updatedPage = page + 1;
    onClick(updatedPage);
  };

  return (
    <Btn type="button" onClick={handeClick}>
      Load More
    </Btn>
  );
}
