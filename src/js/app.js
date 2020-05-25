import "../css/style.css";
import "../js/plugins";
import locations from "./store/locations";
import favotitesStore from "./store/favorites";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import favoritesUI from "./views/favorites";

document.addEventListener("DOMContentLoaded", (e) => {
    initApp();
    const form = formUI.form;

    //events
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    //handlers
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
        favoritesUI.init(favotitesStore.ticketList, onAddTicketToFavotite, onDeleteTicketFromFavorite);
    }

    function onAddTicketToFavotite(ticketId) {
        const ticket = locations.getTicketById(ticketId);
        favotitesStore.addTicket(ticket);
    }

    function onDeleteTicketFromFavorite(ticketId) {
        favotitesStore.deleteTicketById(ticketId);
    }

    async function onFormSubmit() {
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;

        const currency = currencyUI.currencyValue;

        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });
        ticketsUI.renderTickets(locations.lastSearch);
        favoritesUI.refresh();
        // console.log(locations.lastSearch);
    }
});

locations.init().then((res) => {});
