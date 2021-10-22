import React from "react";
import SearchBarStyles from "./SearchBarStyles";

function SearchBar() {
  return (
        <div class="disable-select">
      <SearchBarStyles>
    <div>
        <div>


          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <div className="container">
            <div className="searchInputWrapper">
              <input className="searchInput" type="text" placeholder="Search" />
              <i className="searchInputIcon fa fa-search" />
            </div>
          </div>
        </div>
        </div>
      </SearchBarStyles>
    </div>
  );
}

export default SearchBar;
