import EditscryfallCard from './EditScryfallCard';
import ScryfallCard from './ScryfallCard';
import api from '../api';
import React from 'react';
import { useState, useEffect } from 'react';

const ScryfallCards = () => {
  const [scryfallCards, setScryfallCards] = useState([]);
  const [creatingScryfallCard, setCreatingScryfallCard] = useState([]);
  const [selectedScryfallCard, setSelectedScryfallCard] = useState({});

  // const handleEnableAddMode = this.handleEnableAddMode.bind(this);
  // const handleSave = this.handleSave.bind(this);
  // const handleOnChange = this.handleOnChange.bind(this);
  // const handleDelete = this.handleDelete.bind(this);
  // const handleCancel = this.handleCancel.bind(this);
  // const handleSelect = this.handleSelect.bind(this);
  // }

  // componentDidMount() {
  //   api.getByMinCmc(1).then((json) => setScryfallCards(json))
  // }
  useEffect(() => {
    api.getByMinCmc(1).then((json) => setScryfallCards(json));
  },[]);

  // handleSelect(scryfallCard) {
  //   this.setState({ selectedscryfallCard: scryfallCard });
  // }

  // handleDelete(event, scryfallCard) {
  //   event.stopPropagation();

  //   console.log(
  //     "unable to delete " + scryfallCard.name + ", delete not yet supported"
  //   );
  // api.destroy(scryfallCard).then(() => {
  //   let scryfallCards = this.state.scryfallCards;
  //   scryfallCards = scryfallCards.filter(h => h !== scryfallCard);
  //   this.setState({ scryfallCards: scryfallCards });

  //   if (this.selectedscryfallCard === scryfallCard) {
  //     this.setState({ selectedscryfallCard: null });
  //   }
  // });
  // }

  // handleEnableAddMode() {
  //   this.setState({
  //     addingscryfallCard: true,
  //     selectedScryfallCard: { id: "", name: "", saying: "" },
  //   });
  // }

  // handleCancel() {
  //   this.setState({ addingscryfallCard: false, selectedscryfallCard: null });
  // }

  // handleSave() {
  //   let scryfallCards = this.state.scryfallCards;

  //   if (this.state.addingscryfallCard) {
  //     api
  //       .create(this.state.selectedscryfallCard)
  //       .then((result) => {
  //         console.log("Successfully created!");

  //         scryfallCards.push(this.state.selectedscryfallCard);
  //         this.setState({
  //           scryfallCards: scryfallCards,
  //           selectedscryfallCard: null,
  //           addingscryfallCard: false,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     api
  //       .update(this.state.selectedscryfallCard)
  //       .then(() => {
  //         this.setState({ selectedscryfallCard: null });
  //       })
  //       .catch((err) => {});
  //   }
  // }

  // handleOnChange(event) {
  //   let selectedscryfallCard = this.state.selectedscryfallCard;
  //   selectedscryfallCard[event.target.name] = event.target.value;
  //   this.setState({ selectedscryfallCard: selectedscryfallCard });
  // }

  return (
    <div>
      <div className="editarea">
        <button onClick={this.handleEnableAddMode}>Add New scryfallCard</button>
        <EditscryfallCard
          // addingscryfallCard={this.state.addingscryfallCard}
          // onChange={this.handleOnChange}
          // selectedScryfallCard={this.state.selectedscryfallCard}
          // onSave={this.handleSave}
          // onCancel={this.handleCancel}
        />
      </div>
      <ul className="scryfallCards">
        {scryfallCards.map((scryfallCard) => {
          return (
            <ScryfallCard
              key={scryfallCard.id}
              scryfallCard={scryfallCard}
              // onSelect={this.handleSelect}
              // onDelete={this.handleDelete}
              // selectedScryfallCard={this.st1te.selectedScryfallCard}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ScryfallCards;
