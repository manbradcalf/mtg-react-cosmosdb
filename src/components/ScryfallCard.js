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
        <img
          className="card-image"
          src={
            // todo: support toggle for double faced cards
            // we need to actually save the card_face object to do this
            // as the below fallback option will not work for anything but
            // Brutal Cathar // Moonrage Brute.
            // the /0/d and ?163... are definitely unique to each card face
            // and are under the card_faces[0 or 1].image_uris object
            props.scryfallCard.image_uris
              ? props.scryfallCard.image_uris.small
              : `https://cards.scryfall.io/small/front/0/d/${props.scryfallCard.id}.jpg?1634347036`
          }
        />
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
