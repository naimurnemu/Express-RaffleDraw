const router = require("express").Router();
const {
  sellSingleTicket,
  sellBulkTickets,
  findAllTickets,
  findById,
  findByUsername,
  updateById,
  updateByUsername,
  deleteById,
  deleteByUsername,
  drawWinners,
} = require("./controllers");

router.route("/ticket/:id")
  .get(findById)
  .put(updateById)
  .delete(deleteById);

router.route("/user/:username")
  .get(findByUsername)
  .put(updateByUsername)
  .delete(deleteByUsername);

router.route("/")
  .get(findAllTickets)
  .post(sellSingleTicket);

router.post("/bluk", sellBulkTickets);
router.get("/draw", drawWinners);


module.exports = router;