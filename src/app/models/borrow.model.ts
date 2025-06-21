import { Schema, model } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book reference is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
      min: [1, "Quantity must be a positive integer."],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer.",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Borrow = model<IBorrow>("Borrow", borrowSchema);

borrowSchema.post("save", function (doc, next) {
  console.log("User saved successfully", doc);
  next();
});

export { Borrow };
