import React, { Component } from "react";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService";
import RowBlock from "../rowBlock";
import { withData } from "../withData/withData";

class HousePage extends Component {
  gotService = new gotService();

  state = {
    selectedHouse: null,
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({
      selectedHouse: id,
    });
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

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        data={this.props.data}
        renderItem={({ name }) => name}
      />
    );

    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedHouse}
        getData={this.gotService.getHouse}
      >
        <Field field="region" label="Region" />
        <Field field="words" label="Words" />
        <Field field="titles" label="Titles" />
        <Field field="overlord" label="Overlord" />
        <Field field="ancestralWeapons" label="AncestralWeapons" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={itemDetails} />;
  }
}
const { getAllHouses } = new gotService();
export default withData(HousePage, getAllHouses);
