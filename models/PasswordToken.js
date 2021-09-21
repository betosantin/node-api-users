var knex = require("../database/connection");
const User = require("../models/User");

class PasswordToken {

    async create(email) {
        var user = await User.findEmail(email);

        if (user != undefined) {
            try {
                var token = Date.now();

                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token // Usar o UUID
                }).table("passwordTokens");

                return { status: true, token: token };
            } catch (erro) {
                console.log(erro);
                return { status: false, err: erro };
            }


        } else {
            return { status: false, err: "O e-mail informado não existe." };
        }
    }

    async validateToken(token) {
        try {
            var result = await knex.select().where({ token: token }).from("passwordTokens");

            if(result.length > 0){
                var t = result[0];
                
                if(t.used){
                    return {status: false};
                }

                //Aqui deveriamos validar o token

                return {status: true, token: t};
            } 

            return {status: false};
        } catch (erro) {
            console.log(erro);
            return {status: false};
        }
    }

    async setUsed(token){
        await knex.update({used: 1}).where({token: token}).table("passwordTokens");
    }

}

module.exports = new PasswordToken();