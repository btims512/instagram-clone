import styled from "styled-components";

const SearchBarStyles = styled.div`

  body {
    background-color: great
    color: gray;
    font-family: sans-serif;
  }

  .container {
    /* height: 100vh; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .heading {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }

  .searchInputWrapper {
    border: 0.5px solid lightgrey;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* position: center; */
  }

  .searchInput {
    width: 12rem;
    height: 1.8rem;
    padding: 0 1rem;
    border: none;
    transition: transform 0.1s ease-in-out;
  }

  ::placeholder {
    color: #fafafa;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  .searchInput:focus {
    /* outline: none;
    transform: scale(1.1); */
    transition: all 0.5s ease-in-out;
  }

  .searchInputIcon {
    color: #a1a1a1;
  }

  .container:focus-within > .searchInputWrapper > .searchInputIcon {
    right: 0.2rem;
  }
`;

export default SearchBarStyles;
