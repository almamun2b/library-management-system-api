import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to the Library Management System API!",
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found!" });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    success: false,
    message: error.message,
    error: error,
  });
  next();
});

export default app;
