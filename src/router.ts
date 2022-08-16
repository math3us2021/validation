import { Router } from "express";
import  {validate}  from './validation';
import { controller, validateControler } from "./controller";



const route = Router();

const schemaUser = { /// O schema é um objeto que vai ser usado para validar os dados no middware
    username:{
        required: 'Username é obrigatório',
    },
    password:{
        min: 10,
        max: 12,
    },
    email:{
        type: 'email',
        required: 'Email é obrigatório',
    }
}

route.get('/', controller);

route.post('/user', validate(schemaUser), (request, response)=>{
    return response.json(request.body);
})// o body é um json que vem no corpo da requisição 

route.post('/validation', validateControler);

export default route;
