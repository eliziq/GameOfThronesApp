import React, { Component } from "react";
import "./itemList.css";
import { withData } from "../withData/withData";
import GotService from "../../services/gotService";
export default class ItemList extends Component {
  renderItems(arr) {
    console.log(arr);
    return arr.map((item) => {
      const { id } = item;

      const label = this.props.renderItem(item);

      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    const { data } = this.props;

    const items = this.renderItems(data);

    return <ul className="item-list list-group">{items}</ul>;
  }
}

// const { getAllCharacters } = new GotService();
// export default withData(ItemList, getAllCharacters);
