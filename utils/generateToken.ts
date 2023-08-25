import jwt from "jsonwebtoken";

interface userType {
    userEmail: string;
  }
  
const generateAccessToken = (user: userType) => {
  try{
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "7200s" });
    return accessToken;
  }
  catch(err){
    console.log(err);
    }
};

export { generateAccessToken};