// In Node.js -> const fs = require('fs');

//ES MODULE STYLE

import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

// -----------------------------------SEARCH COMPONENT --------------------------------------

const submitHandler = (event) => {
  // prevent default behavior
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;

  // validation (regular expression example)
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError("Your Search May Not Contain Numbers.");
    return;
  }
  //blur input
  searchInputEl.blur();

  // clear previous search results
  jobListSearchEl.innerHTML = "";

  // render spinner
  renderSpinner("search");

  // fetch search result NOTICE the PATH '?search=javascript&new=true'
  // with a query string
  // using BACKTICKS HERE to insert javascript
  fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    .then((res) => {
      if (!res.ok) {
        console.log("Something went wrong");
        return;
      }
      return res.json();
    })
    .then((data) => {
      //extract job items from the data
      const { jobItems } = data;
      //display what you get
      //console.log(jobItems);
      // remove the spinner class
      renderSpinner("search");

      //render number of results
      numberEl.textContent = jobItems.length;

      // render job items in search job list
      renderJobList(jobItems);
    })
    .catch((error) => console.log(error));
};

searchFormEl.addEventListener("submit", submitHandler);
