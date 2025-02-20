const shortid = require("shortid");

/**
 * Ticket constractor holds ticket details
 * @param {string} username - username of ticket owner
 * @param {number} price - price of the ticket
 */
class Ticket {
  constructor(username, price) {
    this.ticket_id = shortid.generate();
    this.username = username;
    this.price = price;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

module.exports = Ticket;