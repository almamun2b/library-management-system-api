import { model, Schema } from "mongoose";
import { BookModel, IBook } from "../interfaces/book.interface";

const VALID_GENRES = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required."],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Book author is required."],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Book genre is required."],
      enum: {
        values: VALID_GENRES,
        message: `Genre must be one of: ${VALID_GENRES.join(", ")}.`,
      },
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required."],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, "Number of copies is required."],
      min: [0, "Copies must be a non-negative integer."],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer.",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.static(
  "borrowBook",
  async function (bookId: string, quantity: number) {
    const book = await this.findById(bookId);
    if (!book) throw new Error("Book not found.");
    if (book.copies < quantity) throw new Error("Not enough copies available.");

    book.copies -= quantity;
    if (book.copies === 0) {
      book.available = false;
    }
    await book.save();
    return book;
  }
);

const Book = model<IBook, BookModel>("Book", bookSchema);

export { Book };
