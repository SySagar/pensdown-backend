import express from 'express';

const router = express.Router();

router.get('/', (req,res)=>{res.send("👋 hey there homie! server is up and running!")});

export default router;