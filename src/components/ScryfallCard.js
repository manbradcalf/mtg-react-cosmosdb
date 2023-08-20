import React from 'react';

const ScryfallCard = props => {
  return (
    <li
      onClick={() => props.onSelect(props.scryfallCard)}
      className={props.scryfallCard === props.selectedscryfallCard ? 'selected' : ''}
    >
      <button
        className="delete-button"
        onClick={e => props.onDelete(e, props.scryfallCard)}
      >
        Delete
      </button>
      <div className="scryfallCard-element">
        <img src={props.scryfallCard.image_uris.small} />
        <div className="badge">
          {props.scryfallCard.id}
        </div>
        <div className="name">
          {props.scryfallCard.name}
        </div>
      </div>
    </li>
  );
};

export default ScryfallCard;
