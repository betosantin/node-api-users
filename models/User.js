var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class User {

    async new(email, passwordPlain, name) {
        var password = await bcrypt.hash(passwordPlain, 10);

        await knex.insert({ email, password, name, role: 0 }).table("users");
    }

    async findAll() {
        try {
            return await knex.select(["id", "email", "name", "role"]).table("users");
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }

    async findById(id) {
        try {
            return await knex.select(["id", "email", "name", "role"]).table("users").where({ id: id });
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }

    async findEmail(email) {
        try {
            var result = await knex.select(["id", "email", "name", "password", "role"]).from("users").where({ email: email });

            if(result.length > 0){
                return result[0];
            } 

            return undefined;
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }

    async update(id, email, name, role) {

        var user = await this.findById(id);

        if (user != undefined && user.length > 0) {
            var editUser = {};

            if (email != undefined) {
                if (email != user.email) {
                    if (!await this.findEmail(user.email)) {
                        editUser.email = email;
                    } else {
                        return { status: false, err: "O e-mail já está cadastrado." }
                    }
                }
            }

            if (name != undefined) {
                editUser.name = name;
            }

            if (role != undefined) {
                editUser.role = role;
            }

            try {
                await knex.update(editUser).where({ id: id }).table("users");

                return { status: true };
            } catch (err) {
                return { status: false, err: "Ocorreu um erro ao atualizar usuário: " + err };
            }
        } else {
            return { status: false, err: "O usuário não existe!" }
        }

    }

    async delete(id) {

        var user = await this.findById(id);

        if (user != undefined && user.length > 0) {

            try {
                await knex.delete().where({ id: id }).table("users");

                return { status: true };
            } catch (err) {
                return { status: false, err: "Ocorreu um erro ao deletar usuário: " + err };
            }
        } else {
            return { status: false, err: "O usuário não existe!" }
        }
    }

    async changePassword(newPass, id, token){
        var password = await bcrypt.hash(newPass, 10);

        await knex.update({password: password}).where({id: id}).table("users");

        await PasswordToken.setUsed(token);
    }
0
}

module.exports = new User();