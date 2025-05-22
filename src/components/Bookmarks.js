import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";
import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // don't continue if click was outside of bookmark button
  if (!event.target.className.includes("bookmark")) return;

  // update the state
  if (
    state.bookmarkJobItems.some(
      (bookmarkJobItem) => bookmarkJobItem.id === state.activeJobItem.id
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (bookmarkJobItem) => bookmarkJobItem.id !== state.activeJobItem.id
    );
  } else {
    state.bookmarkJobItems.push(state.activeJobItem);
  }

  // update bookmark icon
  // need to select it here because it doesn't exist until time of navigation
  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");
};

const mouseEnterHandler = () => {
  // make bookmarks button look active
  bookmarksBtnEl.classList.add("bookmarks-btn--active");
  // make job list visible
  jobListBookmarksEl.classList.add("job-list--visible");

  // render bookmarks job list
  renderJobList("bookmarks");
};

const mouseLeaveHandler = () => {
  // make bookmarks button look inactive
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");
  // make job list invisible
  jobListBookmarksEl.classList.remove("job-list--visible");
};

bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);
jobDetailsEl.addEventListener("click", clickHandler);
