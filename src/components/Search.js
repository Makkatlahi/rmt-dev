// In Node.js -> const fs = require('fs');

//ES MODULE STYLE

import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  state,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";
import { getData } from "../common.js";

// -----------------------------------SEARCH COMPONENT --------------------------------------
//have to set this function to be asynchronous so we could fetch the data using async/await
const submitHandler = async (event) => {
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
  //blur input (unfocus)
  searchInputEl.blur();

  // clear previous search results
  jobListSearchEl.innerHTML = "";

  // render spinner
  renderSpinner("search");

  // fetch search result NOTICE the PATH '?search=javascript&new=true'
  // with a query string
  // using BACKTICKS HERE to insert javascript

  try {
    //fetch search results
    //get data
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    //extract job items
    const { jobItems } = data;

    //update state
    state.searchJobItems = jobItems;

    //remove spinner
    renderSpinner("search");

    //render number of results
    numberEl.textContent = jobItems.length;

    //render job items in search job list
    renderJobList();
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);

//

// fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
//   .then((res) => {
//     if (!res.ok) {
//       // 4xx, 5xx status code
//       //console.log("Something went wrong");
//       throw new Error(
//         "Resource Issue (e.g. resourse doesn't exist) or server issue"
//       ); // constructor function
//       //return;
//     }
//     return res.json();
//   })
//   .then((data) => {
//     //extract job items from the data
//     const { jobItems } = data;
//     //display what you get
//     //console.log(jobItems);
//     // remove the spinner class
//     renderSpinner("search");

//     //render number of results
//     numberEl.textContent = jobItems.length;

//     // render job items in search job list
//     renderJobList(jobItems);
//   })
//   .catch((error) => {
//     renderSpinner("search");
//     renderError(error.message);
//   }); //network problem or other errors (e.g. trying to parse something not JSON as JSON)
