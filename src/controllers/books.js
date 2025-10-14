const { request } = require("express");
const Book = require("../models/book");

const getBooks = (req, res) => {
  return Book.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => res.status(500).send("Внутренняя ошибка сервера"));
};

const getBook = (req, res) => {
  const { book_id } = req.params;
  return Book.findById(book_id)
    .then((book) => {
      if (!book) return res.status(404).send("Книга не найдена");
      res.status(200).send(book);
    })
    .catch((e) => res.status(500).send("IВнутренняя ошибка сервера"));
};

const addBook = (req, res) => {
  return Book.create({ ...req.body })
    .then((book) => {
      res.status(201).send(book);
    })
    .catch((e) => res.status(500).send("Внутренняя ошибка сервера"));
};

const updateBook = (req, res) => {
  const { book_id } = req.params;
  return Book.findByIdAndUpdate(book_id, { ...req.body }, { new: true })
    .then((book) => {
      if (!book) return res.status(404).send("Книга не найдена");
      res.status(200).send(book);
    })
    .catch((e) => res.status(500).send("Внутренняя ошибка сервера"));
};

const deleteBook = (req, res) => {
  const { book_id } = req.params;
  return Book.findByIdAndDelete(book_id)
    .then((book) => {
      if (!book) return res.status(404).send("Книга не найдена");
      res.status(200).send("Success");
    })
    .catch((e) => res.status(500).send("Внутренняя ошибка сервера"));
};

module.exports = {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
};