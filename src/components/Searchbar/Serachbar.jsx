import { useState } from "react";
import {
  Button,
  ButtonLabel,
  Input,
  Searchbar,
  SearchForm,
} from "./Searchbar.styled";

export function Serachbar({ onSubmit }) {
  const [image, setImage] = useState("");
  const [page] = useState(1);

  const handleInputChange = (e) => {
    setImage(e.target.value);
  };

  const handleFormSubit = (e) => {
    e.preventDefault();
    onSubmit(image, page);
    setImage("");
  };

  return (
    <Searchbar className="Searchbar">
      <SearchForm onSubmit={handleFormSubit}>
        <Button type="submit">
          <ButtonLabel className="SearchForm-button-label">Search</ButtonLabel>
        </Button>

        <Input
          onChange={handleInputChange}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={image}
        />
      </SearchForm>
    </Searchbar>
  );
}
