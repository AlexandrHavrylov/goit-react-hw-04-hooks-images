import React, { Component } from "react";
import {
  Button,
  ButtonLabel,
  Input,
  Searchbar,
  SearchForm,
} from "./Searchbar.styled";

export class Serachbar extends Component {
  state = {
    image: "",
  };

  handleInputChange = (e) => {
    this.setState({
      image: e.target.value,
    });
  };

  handleFormSubit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.image);
    this.setState({
      image: "",
    });
  };

  render() {
    return (
      <Searchbar className="Searchbar">
        <SearchForm onSubmit={this.handleFormSubit}>
          <Button type="submit">
            <ButtonLabel className="SearchForm-button-label">
              Search
            </ButtonLabel>
          </Button>

          <Input
            onChange={this.handleInputChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.image}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
