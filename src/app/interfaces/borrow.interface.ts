import { ObjectId } from "mongoose";

interface IBorrow {
  book: ObjectId;
  qunatity: number;
  dueDate: Date;
}

export { IBorrow };
