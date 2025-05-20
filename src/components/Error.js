import { DEFAULT_DISPLAY_TIME, errorTextEl, errorEl } from "../common.js";

// create a render function
const renderError = (message = "An Error Occured") => {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  // need to remove whatever you added, if you want: set a timer on it
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, DEFAULT_DISPLAY_TIME);
};

export default renderError;
