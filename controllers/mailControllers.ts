import nodemailer from 'nodemailer';

export const sendMail = async (req: any, res: any) => {

    const {senderMail, text} = req.body
    let flag=false;
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'sysagar07@gmail.com', 
            pass: process.env.EMAIL_PASS 
        }
    });

    try {
        transporter.sendMail({
            from: senderMail, 
            to: 'sysagar07@gmail.com', 
            subject: 'From Pensdown', 
            text: text, 
        }).then(()=>{
            console.log('Email sent')
            flag=true;
            
        })
    } catch (error) {
        console.log(error)
    }
  
    if(flag)
    res.json({
        message: 'Email sent',
        status:'201'})
        else
        res.json({
            message:'Some error occured',
            status:'400'
        })

}