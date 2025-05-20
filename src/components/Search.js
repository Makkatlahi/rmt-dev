// In Node.js -> const fs = require('fs');

//ES MODULE STYLE

import {
  searchInputEl,
  searchFormEl,
  spinnerSearchEl,
  jobListSearchEl,
  numberEl,
  errorTextEl,
  errorEl,
} from "../common.js";

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
    errorTextEl.textContent = "Your search may not contain numbers";
    errorEl.classList.add("error--visible");
    // need to remove whatever you added, if you want: set a timer on it
    setTimeout(() => {
      errorEl.classList.remove("error--visible");
    }, 3500);
    return;
  }
  //blur input
  searchInputEl.blur();

  // clear previous search results
  jobListSearchEl.innerHTML = "";

  // render spinner
  spinnerSearchEl.classList.add("spinner--visible");

  // fetch search result NOTICE the PATH '?search=javascript&new=true'
  // with a query string
  // using BACKTICKS HERE to insert javascript
  fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
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
      spinnerSearchEl.classList.remove("spinner--visible");

      //render number of results
      numberEl.textContent = jobItems.length;

      // render job items in search job list
      jobItems.slice(0, 7).forEach((jobItem) => {
        const newJobItemHTML = `
          <li class="job-item">
            <a class="job-item__link" href="${jobItem.id}">
                <div class="job-item__badge">${jobItem.badgeLetters}</div>
                <div class="job-item__middle">
                   <h3 class="third-heading">${jobItem.title}</h3>
                   <p class="job-item__company">${jobItem.company}</p>
                   <div class="job-item__extras">
                      <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                      <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                      <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                   </div>
                </div>
                <div class="job-item__right">
                  <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                  <time class="job-item__time">${jobItem.daysAgo}d</time>
                </div>
            </a>
          </li>`;

        jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
      });
    })
    .catch((error) => console.log(error));
};

searchFormEl.addEventListener("submit", submitHandler);
