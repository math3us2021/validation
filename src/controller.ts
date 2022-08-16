import {Request, Response } from 'express';
import * as yup from 'yup';

function controller(request:Request, response:Response){
    return response.json(request.body);    
}


 async function validateControler  (req:Request, res: Response){
    const schema = yup.object().shape({
        name: yup.string().required("O nome é obrigatório"),
        email: yup.string().email("Email incorreto ").required(),
        password: yup.string().required().min(6).max(12),
        confirmPassword: yup.string().required().min(6).max(12).oneOf([yup.ref('password')]),
});
   try{
    await schema.validate(req.body);
   } catch(error){
    return res.status(400).json(error);
    }
}

export {controller, validateControler};