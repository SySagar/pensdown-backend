import express from "express";
import cors from "cors";
import morgan from "morgan";
import DBConnect from "./config/db";
import appRoutes from "./routes/index";

const app = express();
const whitelist = [
    "https://pensdown.soumyasagar.in",
    "https://pensdown-staging.firebaseapp.com",
    "https://pensdown-staging.web.app",
    "https://pensdown-dad2d.firebaseapp.com",
    "https://pensdown-dad2d.web.app",
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
  app.use(morgan("dev"));
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({limit: '50mb', extended: true}));

//connect to database
DBConnect();

//routes
app.use("/", appRoutes.welcomeRoutes);
app.use("/auth", appRoutes.authRoutes);
app.use("/verify", appRoutes.verifyRoutes);
app.use("/blog", appRoutes.blogRoutes);
app.use("/notifications", appRoutes.notificationRoutes);
app.use("/user", appRoutes.userRoutes);
app.use('/mail',appRoutes.mailRoutes)

const server = app.listen(5000, () => {
  console.log("🚀 Server is running on port 5000");
});

export default server;
