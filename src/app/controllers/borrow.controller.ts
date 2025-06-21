import { Request, Response, Router } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

const borrowRoutes = Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.borrowBook(bookId, quantity);
    console.log(book);

    const borrow = new Borrow({ book: bookId, quantity, dueDate });
    await borrow.save();

    res.status(201).send({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    const err = error as Error;
    res.status(400).send({
      success: false,
      message: err.message,
      error,
    });
  }
});
borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).send({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
});

export { borrowRoutes };
