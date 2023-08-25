import validateToken from '../utils/validateToken';

interface isVerified {
    response: any;
    status: number;
    user: object;
}

export default async function verifyToken(req:any, res:any, next:any){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        const isValidToken = await validateToken(bearerToken) as unknown as isVerified;
        if(isValidToken.status==200)
        {req.token = bearerToken;
            req.user = isValidToken.user;
            next();
        }
        else
        {
            res.sendStatus(400);
        }
        
    }else{
        res.sendStatus(403);
    }
}