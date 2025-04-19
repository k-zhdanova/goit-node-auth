import express from "express";
import morgan from "morgan";
import cors from "cors";
import sequelize from './db/db.js';
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);


app.use((d_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

(async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ alter: true });
    // console.log('✅ Database connected and synced');
    app.listen(3000, () => console.log('Server listening on 3000'));
  } catch (err) {
    console.error('DB error', err);
    process.exit(1);
  }
})();
