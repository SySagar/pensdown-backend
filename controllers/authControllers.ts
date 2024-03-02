import {createUser,searchUserByEmail} from "../repository/auth";
import { hashPassword,comparePasswords } from "../utils/bycrypt";
import { generateAccessToken } from "../utils/generateToken";
import { passwordValidator } from "../utils/isPasswordValid";

interface User {
  name: string;
  displayName: string;
  bio: string;
  email: string;
  hashedPassword: string;
  blogs: [];
}

export const registerUser = async (req: any, res: any) => {

  console.log(req.body)

  const { email, password,tags }: any = req.body;
  const {name,username,bio}:any = req.body.profile
  const displayName = username || name

  const isPasswordValid = passwordValidator(password);

  if (!isPasswordValid) {
    res.send({
      message: "password must be at least 8 characters long",
      status: 400,
    });
  }
  const hashedPassword = await hashPassword(password);
  const user: User = {
    name,
    displayName,
    bio,
    email,
    hashedPassword,
    blogs: [],
    tags:tags
  } as User;

  const isUserExists = await searchUserByEmail(email);

  if (isUserExists) {console.log("user saved to db");res.send("user already exists");}
  else {
    //creates a new user in the database
    const result = await createUser(user);

    console.log(result);

    if (result) {console.log("user saved to db");res.send("user saved to db");}
    else res.send("error saving user to db");
  }
};

export const loginUser = async (req: any, res: any) => {
  
  const { email, password }: any = req.body;

  const user = await searchUserByEmail(email);

    const hashedPassword = user?.hashedPassword as string;

  if (user) {

    const isPasswordMatch = await comparePasswords(password,hashedPassword);

    if (isPasswordMatch) {
      console.log("user logged in");
      const token = generateAccessToken({ userEmail: email });
      res.json({ message: "user logged in", status: 200, user:user,token:token });

    } else res.json({ message: "Wrong credentials", status: 401 });
  }
  else 
  res.json({ message: "user not found", status: 404 });


};
