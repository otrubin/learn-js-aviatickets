import config from "../config/apiConfig";

class Favorites {
    constructor(favoriteKeyName) {
        this._favoriteKeyName = favoriteKeyName;
        this._ticketList = this._loadTicketList();
    }

    _loadTicketList() {
        const tickets = localStorage.getItem(this._favoriteKeyName);
        return tickets ? JSON.parse(tickets) : [];
    }

    _updateStorage() {
        localStorage.setItem(this._favoriteKeyName, JSON.stringify(this._ticketList));
    }

    addTicket(ticket) {
        console.log(this);
        this._ticketList.push(ticket);
        this._updateStorage();
    }

    deleteTicketById(id) {
        const index = this._ticketList.findIndex(item => item.id === id);
        if (index === -1){
            return;
        }
        this._ticketList.splice(index, 1);
        this._updateStorage();
    }

    get ticketList() {
        return this._ticketList;
    }
}

const favotitesStore = new Favorites(config.favoriteKeyName);

export default favotitesStore;
