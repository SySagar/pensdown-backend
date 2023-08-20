import jwt from "jsonwebtoken";

interface verificationType {
    req: any;
    res: any;
    next: any;
    token: string;
  }
  

export const verifyToken = (req:any, res:any,token:any,next:any) => {
  console.log("req",req)
  console.log("random shit")
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err : any, user : any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};