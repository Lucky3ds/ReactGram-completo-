const {body} = require("express-validator")
const error = require("mongoose/lib/error")

const userCreateValidation = () =>{
    return[
    body("name")
        .isString()
        .withMessage("o nome é obrigatório!")
        .isLength({min:3})
        .withMessage("O nome precisa de no mínimo 3 caracteres!"),
    body("email")
        .isString()
        .withMessage("O e-mail é obrigatório!")  
        .isEmail()
        .withMessage("Insira um e-mail válido!"),
    body("password")
        .isString()
        .withMessage("A senha é obrigatória!")
        .isLength({min:5})
        .withMessage("A senha precisa ter mais de 5 caracteres!"),
    body("confirmPassword")    
        .isString()
        .withMessage("A senha de confirmação é obrigtória!")
        .custom((value,{req})=>{
            if(value!=req.body.password){
                throw new Error("As senhas não são iguais!")

            }
            return true;
        })

    ]
}

const loginvalidation = () =>{
    return[
        body("email")
        .isString()
        .withMessage("O email é obrigatório!")
        .isEmail()
        .withMessage("insira um e-mail válido! Ex:usuario@gmail.com"),
        body("password")    
        .isString()
        .withMessage("A senha é obrigatória")

    ]
}
const userUpdateValidation = ()=>{
    
    return[
       body("name")
        .optional()
        .isLength({min:3})
        .withMessage("o nome precisa de pelo menos 3 caracteres!"),
       body("password") 
        .optional()
        .isLength({min:5})
        .withMessage("A senha precisa de no mínimo 5 caracteres!")

    ]
}
module.exports ={
    userCreateValidation,
    loginvalidation,
    userUpdateValidation,
}