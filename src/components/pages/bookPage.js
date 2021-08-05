import React, { Component } from "react";
import ItemList from "../itemList";
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService";
import { withRouter } from "react-router-dom";
import { withData } from "../withData/withData";

class BookPage extends Component {
  // gotService = new gotService();

  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    console.log(this.props);

    return (
      <ItemList
        onItemSelected={(itemId) => {
          this.props.history.push(itemId);
        }}
        data={this.props.data}
        renderItem={({ name }) => name}
      />
    );
  }
}
const { getAllBooks } = new gotService();
export default withRouter(withData(BookPage, getAllBooks));
