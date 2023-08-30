// @ts-nocheck
import { Request, Response, NextFunction } from 'express'; 
import redisClient from '../config/redis';

export const cacheData = (userId: string, req: Request, res: Response, next: NextFunction) => {
  
  console.log('Checking for user in Redis 🟡');
  // getting our data by key (id)
  redisClient.get(userId, (err: Error | null, data: any) => {
    if (err) {
      res.status(500).send(err);
    }
    if (data !== null) {
      console.log('We found it in Redis 🟢');
      res.send(data);
    } else {
      console.log('User not found 🔴');
      // Go to the next middleware or route handler
      next();
    }
  });
};