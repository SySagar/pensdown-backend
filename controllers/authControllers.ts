import {createUser,searchUserByEmail} from "../repository/auth";
import { hashPassword } from "../utils/bycrypt";

interface User {
  name: string;
  displayName: string;
  email: string;
  hashedPassword: string;
  blogs: [];
}

export const registerUser = async (req: any, res: any) => {
  const { name, displayName, email, password }: any = req.body;

  const hashedPassword = await hashPassword(req.body.password);
  const user: User = {
    name,
    displayName,
    email,
    hashedPassword,
    blogs: [],
  } as User;

  const isUserExists = await searchUserByEmail(email);

  if (isUserExists) res.send("user already exists");
  else {
    //creates a new user in the database
    const result = await createUser(user);

    console.log(result);

    if (result) res.send("user saved to db");
    else res.send("error saving user to db");
  }
};

export const loginUser = async (req: any, res: any) => {
  res.send("login user");
};
