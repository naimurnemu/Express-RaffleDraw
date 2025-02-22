const Ticket = require("./Ticket");
const { readFile, writeFile } = require("./utils");

const tickets = Symbol("tickets");
class TicketCollection {
  constructor() {
    this[tickets] = [];
    (async function () {
      this[tickets] = await readFile();
    }.call(this));
  }

  /**
   * Create and save a new ticket
   * @param {string} username 
   * @param {number} price 
   * @return {Ticket}
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this[tickets].push(ticket);
    writeFile(this[tickets]);
    return ticket;
  }

  /**
   * Create bulk tickets
   * @param {string} username 
   * @param {number} price 
   * @param {number} quantity 
   * @returns {Ticket[]}
   */
  createBulk(username, price, quantity) {
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.createTicket(username, price);
      tickets.push(ticket);
    }
    writeFile(this[tickets]);
    return tickets;
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
    if (ticket) {
      ticket.username = newBody.username ?? ticket.username;
      ticket.price = newBody.price ?? ticket.price;
      ticket.updated_at = new Date();
    }
    writeFile(this[tickets]);
    return ticket;
  }

  /**
   * update all tickets by username
   * @param {string} username 
   * @param {{username: string, price: number}} ticketBody 
   * @returns {Ticket[]}
   */
  updateBulk(username, ticketBody) {
    const userTickets = this.findByUsername(username);
    userTickets.forEach(

      /**
       * @param {Ticket} ticket 
       */
      (ticket) => this.updateById(ticket.ticket_id, ticketBody));
    writeFile(this[tickets]);
    return tickets;
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
      writeFile(this[tickets]);
      return true;
    }
  }

  /**
   * delete all tickets by username
   * @param {string} username 
   * @returns {boolean[]}
   */
  deleteBulk(username) {
    const userTickets = this.findByUsername(username);
    const deletedResult = userTickets.map(
      /**
       * @param {Ticket} ticket 
       */
      (ticket) => this.deleteById(ticket.ticket_id));
    writeFile(this[tickets]);
    return deletedResult;
  }

  /**
   * find winners
   * @param {number} winnerCount
   * @returns {Ticket[]} 
   */
  draw(winnerCount) {
    const winnerIndexes = new Array(winnerCount);

    let winnerIndex = 0;
    while (winnerIndex < winnerCount) {
      let ticketIndex = Math.floor(Math.random() * this[tickets].length);
      if (!winnerIndexes.includes(ticketIndex)) {
        winnerIndexes[winnerIndex++] = ticketIndex;
        continue;
      }
    }

    return winnerIndexes.map(
      /**
       * @param {number} index 
       */
      (index) => this[tickets][index]
    );
  }
}

const ticketCollection = new TicketCollection();
module.exports = ticketCollection;