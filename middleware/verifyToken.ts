import jwt from "jsonwebtoken";

interface verificationType {
    req: any;
    res: any;
    next: any;
    token: string;
  }
  

const verifyToken = ({ req, res, next, token }: verificationType) => {
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default verifyToken;