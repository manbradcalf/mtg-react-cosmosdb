import React from "react";

const ScryfallCard = (props) => {
  return (
    <div
      onClick={() => props.onSelect(props.scryfallCard)}
      className={
        props.scryfallCard === props.selectedscryfallCard ? "selected" : ""
      }
    >
      <div className="scryfallCard-element">
        <img className="card-image" src={props.scryfallCard.image_uris.small} />
        <div className="price">{props.scryfallCard.prices.usd}</div>
        <button
          className="delete-button"
          onClick={(e) => props.onDelete(e, props.scryfallCard)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ScryfallCard;
