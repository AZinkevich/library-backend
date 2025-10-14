const { request } = require("express");
const reader = require("../models/reader");

const getreaders = (req, res) => {
  return reader
    .find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => res.status(500).send("Внутренняя ошибка сервера"));
};

const getreader = (req, res) => {
  const { reader_id } = req.params;
  return reader
    .findById(reader_id)
    .then((readerData) => {
      if (!readerData) return res.status(404).send("Читатель не найден");
      res.status(200).send(readerData);
    })
    .catch((e) => res.status(500).send("Внутренняя ошибка сервера"));
};

const createreader = (req, res) => {
  return reader
    .create({ ...req.body })
    .then((readerData) => {
      res.status(201).send(readerData);
    })
    .catch((e) => res.status(500).send("Внутренняя ошибка сервера"));
};

const updatereader = (req, res) => {
  const { reader_id } = req.params;
  return reader
    .findByIdAndUpdate(reader_id, { ...req.body }, { new: true })
    .then((readerData) => {
      if (!readerData) return res.status(404).send("Читатель не найден");
      res.status(200).send(readerData);
    })
    .catch((e) => res.status(500).send("Внутренняя ошибка сервера"));
};

const deletereader = (req, res) => {
  const { reader_id } = req.params;
  return reader
    .findByIdAndDelete(reader_id)
    .then((readerData) => {
      if (!readerData) return res.status(404).send("Читатель не найден");
      res.status(200).send("Success");
    })
    .catch((e) => res.status(500).send("Внутренняя ошибка сервера"));
};

const getReaderBooks = (req, res) => {
  const { reader_id } = req.params;
  reader
    .findById(reader_id)
    .populate("books")
    .then((readerData) => {
      if (!readerData) return res.status(404).send("Читатель не найден");
      res.status(200).send(readerData.books);
    })
    .catch((e) => res.status(500).send("Внутренняя ошибка сервера"));
};

const borrowReaderBook = (req, res) => {
  const { reader_id, book_id } = req.params;
  reader
    .findByIdAndUpdate(
      reader_id,
      { $addToSet: { books: book_id } },
      { new: true }
    )
    .populate("books")
    .then((readerData) => {
      if (!readerData) return res.status(404).send("Читатель не найден");
      res.status(200).send(readerData.books);
    })
    .catch((e) => res.status(500).send("Внутренняя ошибка сервера"));
};

const returnReaderBook = (req, res) => {
  const { reader_id, book_id } = req.params;
  reader
    .findByIdAndUpdate(
      reader_id,
      { $pull: { books: book_id } },
      { new: true }
    )
    .populate("books")
    .then((readerData) => {
      if (!readerData) return res.status(404).send("Читатель не найден");
      res.status(200).send(readerData.books);
    })
    .catch((e) => res.status(500).send("Внутренняя ошибка сервера"));
};

module.exports = {
  getreaders,
  getreader,
  createreader,
  updatereader,
  deletereader,
  getReaderBooks,
  borrowReaderBook,
  returnReaderBook,
};