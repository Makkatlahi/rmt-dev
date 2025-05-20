import { spinnerSearchEl, spinnerJobDetailsEl } from "../common.js";

const renderSpinner = (whichSpinner) => {
  const spinnerEl =
    whichSpinner === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
  //toggle the spinner
  spinnerEl.classList.toggle("spinner--visible");
};

export default renderSpinner;
