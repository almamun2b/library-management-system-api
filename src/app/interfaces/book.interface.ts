import { Model } from "mongoose";

interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

interface BookModel extends Model<IBook> {
  borrowBook: (bookId: string, quantity: number) => Promise<IBook>;
}

export { BookModel, IBook };
