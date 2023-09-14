import User from "../schema/user";

export const searchUserByEmail = async (id: string) => {
    try {
        const user = await User.findOne({
            _id: id
        })
        if(user)
        return user;
        else
        return null;
    } catch (error) {
        console.log(error)
    }
}