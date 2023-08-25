import validateToken from '../utils/validateToken'

interface isVerified {
    status: number;
    message: string;
}

export const verifyTokenController = async (req:any,res:any) => {
    try {
        const token = req.body.token;
        // console.log("verifyTokenController");
        const isValidToken = await validateToken(token) as unknown as isVerified;
        console.log('isValidToken',isValidToken);
        if(isValidToken.status==200)
       res.status(200).json({ message: "success", status: 200 });
        else
        res.status(401).json({ message: "failure", status: 401 });

    }
    catch (err:any) {
        console.log(err);
        res.json({ message: err, status: 401 });
    }
}