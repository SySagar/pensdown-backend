import jwt from "jsonwebtoken";

const validateToken = (token:string) => {
    let verifyObj = {};
 const user =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

 console.log(user);

  if(user)
    verifyObj={status:200, message:"token verified"}
    else
    verifyObj={status:401, message:"token not verified"}

    return verifyObj;
};

export default validateToken;