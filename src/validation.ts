///request é os dados q recemos da requisição
///response é a responsta que vamos enviar para o usuario
///next é o próximo middLeware, se tudo der certo ele vai gerar a resposta

import { Request, Response, NextFunction } from "express";

const validationRegex: any ={
    email:{
        regex: "^[a-zA-Z0-9_.,-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    }
}

function validate(schema: any) { /// será do tipo any porque não sabemos o tipo da função
    const validation = (request: Request, response: Response, next: NextFunction) => {
        const body = request.body;
        const erros: string[] = [];

        Object.keys(schema).forEach(item => {//Pegando as minhas propriedades do schema e colocando em um array
            // console.log(item + '----' + body[item]);

            const itemSchema = schema[item];

            if (itemSchema.required && !body[item]) {
                erros.push(`Campo ${item}  - ${itemSchema.required}`);
            }

            if(itemSchema.min && (body[item].length < itemSchema.min)){
                erros.push(`Campo ${item} : Tamanho mínimo é : ${itemSchema.min}`);
            }
            if(itemSchema.max && (body[item].length > itemSchema.max)){
                erros.push(`Campo ${item} : Tamanho máximo é : ${itemSchema.max}`);
            }

            const regexItem = validationRegex[item];
            if(regexItem && (!new RegExp(regexItem.regex).test(body[item]))){
                erros.push(`Campo ${item} está no formato incorreto`);
            }
        })
        if (erros.length > 0) return response.status(400).json(erros);

        return next();
    }
    return validation;

}

export { validate };
