import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <form action="/get-cards">
        <input
          type="text"
          id="card-search"
          name="cardName"
          placeholder="card name"
        />
        <input
          type="text"
          id="card-search-oracletext"
          name="oracleText"
          placeholder="oracle text"
        />
        <input
          type="text"
          id="card-search-price"
          name="minPrice"
          placeholder="minimum price"
        />
        <input
          type="text"
          id="card-search-type"
          name="typeLine"
          placeholder="type"
        />
        <input
          type="text"
          id="card-search-minCmc"
          name="minCmc"
          placeholder="Minimum CMC"
        />
        <input
          type="text"
          id="card-search-maxCmc"
          name="maxCmc"
          placeholder="Maximum CMC"
        />
        <div className="color-identity-section">
          <input type="checkbox" id="w" name="w" placeholder="W" />
          <label htmlFor="w">W</label>
          <input type="checkbox" id="u" name="u" placeholder="U" />
          <label htmlFor="u">U</label>
          <input type="checkbox" id="b" name="b" placeholder="B" />
          <label htmlFor="b">B</label>
          <input type="checkbox" id="r" name="r" placeholder="R" />
          <label htmlFor="r">R</label>
          <input type="checkbox" id="g" name="g" placeholder="G" />
          <label htmlFor="g">G</label>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default SearchBar;
