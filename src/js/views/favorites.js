import locations from "../store/locations";

class FavoritesUI {
    constructor() {
        this._dropdownButton = document.querySelector(".dropdown-trigger");
        this._favoriteContainer = document.querySelector(".dropdown-content");
    }

    onAddToFavorites(e) {
        e.preventDefault();
        const btn = e.target;
        const id = btn.getAttribute("data-ticket-id");
        try {
            this._addTicketEvent(id);
            const ticket = locations.getTicketById(id);
            this._favoriteTickets.push();
            this.renderFavoriteTickets(this._favoriteTickets);
            btn.classList.add("disabled");
            btn.textContent = "In favorites";
        } catch (error) {
            console.log(error);
        }
    }

    onDeleteFromFavorites(e) {
        e.preventDefault();
        const id = e.target.getAttribute("data-ticket-id");
        try {
            this._deleteTicketEvent(id);
            this._deleteTicket(id);
            this.renderFavoriteTickets(this._favoriteTickets);
        } catch (error) {
            console.log(error);
        }
    }

    init(favoriteTickets, addTicketEvent, deleteTicketEvent) {
        this._favoriteTickets = favoriteTickets;
        this._addTicketEvent = addTicketEvent;
        this._deleteTicketEvent = deleteTicketEvent;

        this.renderFavoriteTickets(this._favoriteTickets);
        this.refresh();
    }

    _deleteTicket(id) {
        const index = this._favoriteTickets.findIndex((item) => item.id === id);
        if (index === -1) {
            return;
        }
        this._favoriteTickets.splice(index, 1);
    }

    refresh() {
        this._addButtons = document.querySelectorAll(".add-favorite");
        this._addButtons.forEach((btn) => {
            btn.addEventListener("click", this.onAddToFavorites.bind(this));
        });
    }

    clearFavoriteContainer() {
        this._favoriteContainer.innerHTML = "";
    }

    renderFavoriteTickets(tickets) {
        this.clearFavoriteContainer();
        let fragment = "";
        tickets.forEach((ticket) => {
            fragment += this.favoriteTicketTemplate(ticket);
        });
        this._favoriteContainer.insertAdjacentHTML("afterbegin", fragment);
        
        this._deleteButtons = document.querySelectorAll(".delete-favorite");
        this._deleteButtons.forEach((btn) => {
            btn.addEventListener("click", this.onDeleteFromFavorites.bind(this));
        });
    }

    favoriteTicketTemplate(ticket) {
        return `<div class="favorite-item d-flex align-items-start">
            <img src="${ticket.airline_logo}" class="favorite-item-airline-img" />
            <div class="favorite-item-info d-flex flex-column">
                <div class="favorite-item-destination d-flex align-items-center">
                    <div class="d-flex align-items-center mr-auto">
                        <span class="favorite-item-city">${ticket.origin_name}</span>
                        <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="medium material-icons">flight_land</i>
                        <span class="favorite-item-city">${ticket.destination_name}</span>
                    </div>
                </div>
                <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${ticket.departure_at}</span>
                    <span class="ticket-price ml-auto">$${ticket.price}</span>
                </div>
                <div class="ticket-additional-info">
                    <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                    <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
                </div>
                <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" data-ticket-id="${ticket.id}">Delete</a>
            </div>
        </div>`;
    }
}

const favoritesUI = new FavoritesUI();

export default favoritesUI;
