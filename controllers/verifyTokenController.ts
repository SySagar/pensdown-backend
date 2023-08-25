import validateToken from '../utils/validateToken'

interface isVerified {
    status: number;
    message: string;
}

export const verifyTokenController = async (req:any,res:any) => {
    try {
        // console.log("verifyTokenController");

       res.json({ message: "success", status: 200 });

    }
    catch (err:any) {
        console.log(err);
        res.json({ message: err, status: 401 });
    }
}