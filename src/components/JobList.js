import {
  RESULTS_PER_PAGE,
  BASE_API_URL,
  jobListSearchEl,
  jobDetailsContentEl,
  state,
  jobListBookmarksEl,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";
import { getData } from "../common.js";

// -----------------------------------JOB LIST COMPONENT --------------------------------------

const renderJobList = (whichJobList = "search") => {
  // determine correct selector for job list (search reasults list or bookmarks list)
  const jobListEl =
    whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;

  //remove previous job items
  jobListEl.innerHTML = "";

  // determine the job items that should be rendered
  let jobItems;
  if (whichJobList === "search") {
    jobItems = state.searchJobItems.slice(
      state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      state.currentPage * RESULTS_PER_PAGE
    );
  } else if (whichJobList === "bookmarks") {
    // since we don't have pages for bookmarks
    jobItems = state.bookmarkJobItems;
  }

  // display job items
  jobItems.forEach((jobItem) => {
    const newJobItemHTML = `
      <li class="job-item ${
        state.activeJobItem.id === jobItem.id ? "job-item--active" : ""
      }">
        <a class="job-item__link" href="${jobItem.id}">
            <div class="job-item__badge">${jobItem.badgeLetters}</div>
            <div class="job-item__middle">
               <h3 class="third-heading">${jobItem.title}</h3>
               <p class="job-item__company">${jobItem.company}</p>
               <div class="job-item__extras">
                  <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${
                    jobItem.duration
                  }</p>
                  <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${
                    jobItem.salary
                  }</p>
                  <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${
                    jobItem.location
                  }</p>
               </div>
            </div>
            <div class="job-item__right">
              <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
              <time class="job-item__time">${jobItem.daysAgo}d</time>
            </div>
        </a>
      </li>`;

    jobListEl.insertAdjacentHTML("beforeend", newJobItemHTML);
  });
};

const clickHandler = async (event) => {
  event.preventDefault();

  //get clicked job item in list
  const jobItemEl = event.target.closest(".job-item");

  //remove the active class from previously active job item
  /*   const activeJobItem = document.querySelector(".job-item--active");
    if (activeJobItem) {
      activeJobItem.classList.remove("job-item--active");
    } */
  // removing the active class from prev active job item USING SHORTCURCUITING '&&'
  // document.querySelector(".job-item--active") &&
  //   document
  //     .querySelector(".job-item--active")
  //     .classList.remove(".job-item--active");

  // USING OPTIONAL CHAINING '?'
  // EDIT: we removed the '?' from ?.classList section because
  // we are now using querySelectorAll
  // then added forEach jobItemWithActiveClass to remove
  // whatever class is currently active so that the tab is
  // not highlighted anymore when clicking another tab

  // remove the active class from previously active job items
  document
    .querySelectorAll(".job-item--active")
    .forEach((jobItemWithActiveClass) =>
      jobItemWithActiveClass.classList.remove("job-item--active")
    );

  // add active class to job item element
  jobItemEl.classList.add("job-item--active");
  //empty job details section
  jobDetailsContentEl.innerHTML = "";

  //render spinner "Job Details spinner"
  renderSpinner("job-details");

  // get the id of the job item that was clicked
  const id = jobItemEl.children[0].getAttribute("href");

  // update the state here so it's quicker
  //list/array of objects
  //find the id that matches the one the user clicked
  state.activeJobItem = state.searchJobItems.find(
    (jobItem) => jobItem.id === +id
  );

  // add id to url
  history.pushState(null, "", `/#${id}`);

  try {
    // fetch job item data
    const data = await getData(`${BASE_API_URL}/jobs/${id}`);
    const { jobItem } = data;

    //remove spinner
    renderSpinner("job-details");

    //render job details
    renderJobDetails(jobItem);
  } catch (error) {
    renderSpinner("job-details");
    renderError(error.message);
  }
};

jobListSearchEl.addEventListener("click", clickHandler);
jobListBookmarksEl.addEventListener("click", clickHandler);

export default renderJobList;

// fetch(`${BASE_API_URL}/jobs/${id}`)
//   .then((res) => {
//     if (!res.ok) {
//       throw new Error(
//         "Resource issue (e.g. resource doesn't exist) or server issue"
//       );
//     }
//     return res.json();
//   })
//   .then((data) => {
//     //extract job item
//     const { jobItem } = data;

//     //remove spinner
//     renderSpinner("job-details");

//     //render job details
//     renderJobDetails(jobItem);
//   })
//   .catch((error) => {
//     renderSpinner("job-details");
//     renderError(error.message);
//   });
