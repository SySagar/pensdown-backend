import express from "express";
import cors from "cors";
import DBConnect from "./config/db";
import appRoutes from "./routes/index";
import verifyToken from "./middleware/verifyToken";

const app = express();
const whitelist = [
    "http://localhost:5173"
  ];
  app.use(
    cors({
      credentials: true,
      origin: function (origin:any, callback) {
        // console.log('origin', origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

//connect to database
DBConnect();

//routes
app.use("/", appRoutes.welcomeRoutes);
app.use("/auth", appRoutes.authRoutes);
app.use("/verify", appRoutes.verifyRoutes);
app.use("/blog", appRoutes.blogRoutes);

app.listen(5000, () => {
  console.log("🚀 Server is running on port 5000");
});
