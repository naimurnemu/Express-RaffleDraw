const ticketCollection = require("./tickets");

// ticket selling controllers
exports.sellSingleTicket = (req, res) => {
  const { username, price } = req.body;
  const ticket = ticketCollection.create(username, price);
  res.status(201).json({
    message: "Ticket created successfully",
    ticket,
  });
};

exports.sellBulkTickets = (req, res) => {
  const { username, price, quantity } = req.body;
  const tickets = ticketCollection.createBulk(username, price, quantity);
  res.status(201).json({
    message: "Tickets created successfully",
    tickets,
  });
};

// find ticket controllers
exports.findAllTickets = (req, res) => {
  const tickets = ticketCollection.find();
  res.status(200).json({
    items: tickets,
    total: tickets.length
  });
};

exports.findById = (req, res) => {
  const ticket = ticketCollection.findById(req.params.id);
  if (!ticket) {
    return res.status(404).json({
      message: "404 not found"
    });
  }
  res.status(200).json(ticket);
};

exports.findByUsername = (req, res) => {
  const tickets = ticketCollection.findByUsername(req.params.username);
  res.status(200).json({
    items: tickets,
    total: tickets.length
  });
};

// update ticket controllers
exports.updateById = (req, res) => {
  const ticket = ticketCollection.updateById(req.params.id, req.body);
  if (!ticket) {
    return res.status(404).json({
      message: "404 not found"
    });
  }
  res.status(200).json({
    message: "Ticket updated successfully",
    ticket,
  });
};

exports.updateByUsername = (req, res) => {
  const tickets = ticketCollection.updateBulk(req.params.username, req.body);
  res.status(200).json({
    items: tickets,
    total: tickets.length
  });
};

// delete ticket controllers
exports.deleteById = (req, res) => {
  const isDeleted = ticketCollection.deleteById(req.params.id);
  if (isDeleted) {
    res.status(204).json({
      message: "Delete operation successful",
    });
  }

  res.status(400).json({
    message: "Delete operation failed",
  })
};

exports.deleteByUsername = (req, res) => {
  const tickets = ticketCollection.deleteByUsername(req.params.username);
  res.status(200).json({
    items: tickets,
    total: tickets.length
  });
};

// draw ticket controllers
exports.drawWinners = (req, res) => { 
  const tickets = ticketCollection.draw(req.body.winnerCount);
  res.status(200).json({
    winners: tickets,
  });
};