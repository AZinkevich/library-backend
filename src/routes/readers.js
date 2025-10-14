const router = require("express").Router();
const {
  getreaders,
  getreader,
  createreader,
  updatereader,
  deletereader,
  borrowReaderBook,
  returnReaderBook,
  getReaderBooks,
} = require("../controllers/readers");

router.get("/readers", getreaders);
router.get("/readers/:reader_id", getreader);
router.post("/readers", createreader);
router.patch("/readers/:reader_id", updatereader);
router.delete("/readers/:reader_id", deletereader);
router.post("/readers/:reader_id/borrow/:book_id", borrowReaderBook);
router.delete("/readers/:reader_id/return/:book_id", returnReaderBook);
router.get("/readers/:reader_id/books", getReaderBooks);

module.exports = router;
