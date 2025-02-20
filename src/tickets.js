const Ticket = require("./Ticket");
const { readFile, writeFile } = require("./utils");

const tickets = Symbol("tickets");

class TicketCollection {
  constructor() {
    this[tickets] = [];
  }

  /**
   * Create and save a new ticket
   * @param {string} username 
   * @param {number} price 
   * @return {Ticket}
   */
  createTicket(username, price) {
    const ticket = new Ticket(username, price);
    this[tickets].push(ticket);
    return ticket;
  }

  /**
   * Return All tickets
   * @returns {Ticket[]}
   */
  find() {
    return this[tickets];
  }

  /**
   * Find single ticket by id
   * @param {string} ticketId 
   * @returns {Ticket}
   */
  findById(ticketId) {
    return this[tickets].find(
      /**
       * @param {Ticket} ticket 
       */
      (ticket) => ticket.ticket_id === ticketId
    );
  }

  /**
   * Find tickets by username
   * @param {string} username 
   * @returns {Ticket[]}
   */
  findByUsername(username) {
    return this[tickets].filter(
      /** 
       * @param {Ticket} ticket  
       */
      (ticket) => ticket.username === username);
  }

  /**
   * Update a ticket by id
   * @param {string} ticketId 
   * @param {{username: string, price: number}} newBody 
   * @returns {Ticket}
   */
  updateById(ticketId, newBody) {
    const ticket = this.findById(ticketId);
    ticket.username = newTicketBody.username ?? ticket.username;
    ticket.price = newTicketBody.price ?? ticket.price;
    ticket.updated_at = new Date();
    return ticket;
  }

  /**
   * Delete a ticket by id
   * @param {string} ticketId 
   * @returns {boolean}
   */
  deleteById(ticketId) {
    const index = this[tickets].findIndex(
      /**
       * @param {Ticket} ticket 
       */
      (ticket) => ticket.ticket_id === ticketId);

    if (index === -1) {
      return false;
    }
    else {
      this[tickets].splice(index, 1);
      return true;
    }
  }
}

const collection = new TicketCollection();
module.exports = collection;