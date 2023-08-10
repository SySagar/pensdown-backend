import User from "../schema/user";

interface UserType {
  name: string;
  displayName: string;
  email: string;
  hashedPassword: string;
  blogs: [];
}

export const createUser = async (user: UserType) => {
  try {
    const newUser = await User.create(user);

    newUser.save()
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const searchUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({email: email})
        if(user)
        return user;
        else
        return null;
    } catch (error) {
        console.log(error)
    }
}

