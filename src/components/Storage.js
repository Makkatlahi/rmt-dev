import { state } from "../common.js";

//retrieve from local storage
const storedJobItems = localStorage.getItem("bookmarkJobItems");

// check if it exists, then parse it as JSON and assign it to state.bookmarkJobItems

if (storedJobItems) {
  state.bookmarkJobItems = JSON.parse(storedJobItems);
}
