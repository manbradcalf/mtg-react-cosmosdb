import React, { Component } from "react";

import EditscryfallCard from "./EditScryfallCard";
import ScryfallCard from "./ScryfallCard";

import api from "../api";

class ScryfallCards extends Component {
  constructor() {
    super();

    this.state = {
      scryfallCards: [],
      creatingscryfallCard: false,
    };

    this.handleEnableAddMode = this.handleEnableAddMode.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    api.getByMinCmc(7).then((json) => this.setState({ scryfallCards: json }));
  }

  handleSelect(scryfallCard) {
    this.setState({ selectedscryfallCard: scryfallCard });
  }

  handleDelete(event, scryfallCard) {
    event.stopPropagation();

    console.log(
      "unable to delete " + scryfallCard.name + ", delete not yet supported"
    );
    // api.destroy(scryfallCard).then(() => {
    //   let scryfallCards = this.state.scryfallCards;
    //   scryfallCards = scryfallCards.filter(h => h !== scryfallCard);
    //   this.setState({ scryfallCards: scryfallCards });

    //   if (this.selectedscryfallCard === scryfallCard) {
    //     this.setState({ selectedscryfallCard: null });
    //   }
    // });
  }

  handleEnableAddMode() {
    this.setState({
      addingscryfallCard: true,
      selectedScryfallCard: { id: "", name: "", saying: "" },
    });
  }

  handleCancel() {
    this.setState({ addingscryfallCard: false, selectedscryfallCard: null });
  }

  handleSave() {
    let scryfallCards = this.state.scryfallCards;

    if (this.state.addingscryfallCard) {
      api
        .create(this.state.selectedscryfallCard)
        .then((result) => {
          console.log("Successfully created!");

          scryfallCards.push(this.state.selectedscryfallCard);
          this.setState({
            scryfallCards: scryfallCards,
            selectedscryfallCard: null,
            addingscryfallCard: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .update(this.state.selectedscryfallCard)
        .then(() => {
          this.setState({ selectedscryfallCard: null });
        })
        .catch((err) => {});
    }
  }

  handleOnChange(event) {
    let selectedscryfallCard = this.state.selectedscryfallCard;
    selectedscryfallCard[event.target.name] = event.target.value;
    this.setState({ selectedscryfallCard: selectedscryfallCard });
  }

  render() {
    return (
      <div>
        <div className="editarea">
          <button onClick={this.handleEnableAddMode}>
            Add New scryfallCard
          </button>
          <EditscryfallCard
            addingscryfallCard={this.state.addingscryfallCard}
            onChange={this.handleOnChange}
            selectedScryfallCard={this.state.selectedscryfallCard}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
          />
        </div>
        <ul className="scryfallCards">
          {this.state.scryfallCards.map((scryfallCard) => {
            return (
              <ScryfallCard
                key={scryfallCard.id}
                scryfallCard={scryfallCard}
                onSelect={this.handleSelect}
                onDelete={this.handleDelete}
                selectedScryfallCard={this.state.selectedScryfallCard}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ScryfallCards;
