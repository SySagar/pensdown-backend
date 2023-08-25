import jwt from "jsonwebtoken";

const validateToken = async (token:string) => {
  try {

    let verifyObj = {};
 const user = await jwt.verify(token,
   process.env.ACCESS_TOKEN_SECRET as string,
    (err:any, user:any) => {
      if (err) {
        console.log(err.name);
        verifyObj={status:401, message:"token not verified"}
      } else {
        return {status:200, message:"token verified",user:user};
      }
    }
  );

    verifyObj={status:200, message:"token verified",user:user}
    return verifyObj;
    
  } catch (error) {
    console.log(error);
    return {status:401, message:"token not verified"}
  }
};

export default validateToken;