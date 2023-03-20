import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import {
  APP_PORT,
  CLIENT_DEV_API,
  CLIENT_PROD_API,
  DEV_API,
  MODE,
  PROD_API,
} from "./config/index.js";
import {
  authRoutes,
  userRoutes,
  mailRoutes,
  pinsRoutes,
} from "./routes/index.js";
import cookieParser from "cookie-parser";
const app = express();

const PORT = APP_PORT || 3000;

app.use(cookieParser());

const corsOptions = {
  origin: `${MODE === "dev" ? CLIENT_DEV_API : CLIENT_PROD_API}`,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: "GET,POST,PUT,DELETE,PATCH",
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/mail", mailRoutes);
app.use("/api/v1/pins", pinsRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from Mapbox");
});

// Error handler
app.use(errorHandler);

connectDB(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `Server is running on ${MODE === "dev" ? DEV_API : PROD_API}`
      );
    })
  )
  .catch((err) => console.log(err));
