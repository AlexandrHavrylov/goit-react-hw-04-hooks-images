import React, { Component } from "react";
import { Btn } from "./Button.styled";

export default class Button extends Component {
  handeClick = () => {
    const updatedPage = this.props.page + 1;
    this.props.onClick(updatedPage);
  };

  render() {
    return (
      <Btn type="button" onClick={this.handeClick}>
        Load More
      </Btn>
    );
  }
}
