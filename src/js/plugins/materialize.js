import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

// Init select
const selects = document.querySelectorAll("select");
M.FormSelect.init(selects);

export function getSelectInstance(elem) {
    return M.FormSelect.getInstance(elem);
}

// Init autocomplete
const autocompletes = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(autocompletes, { data: { Apple: null, Microsoft: null, Google: "https://placehold.it/250x250" } });

export function getAutocompleteInstance(elem) {
    return M.Autocomplete.getInstance(elem);
}

//Init Datepicker
const datepickers = document.querySelectorAll(".datepicker");
M.Datepicker.init(datepickers, {
    showClearBtn: true,
    format: "yyyy-mm",
});

export function getDatePickerInstance(elem) {
    return M.Datepicker.getInstance(elem);
}

//Init Dropdown
const dropdowns = document.querySelectorAll(".dropdown-trigger");
M.Dropdown.init(dropdowns);
