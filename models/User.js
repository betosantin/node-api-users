var knex = require("../database/connection");
var bcrypt = require("bcrypt");

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
            return [];
        }
    }

    async findById(id) {
        try {
            return await knex.select(["id", "email", "name", "role"]).table("users").where({ id: id });
        } catch (error) {
            console.log(error)
            return [];
        }
    }

    async findEmail(email) {
        try {
            var result = await knex.select("*").from("users").where({ email: email });

            if (result.length > 0) {
                return true;
            }

            return false;

        } catch (error) {
            console.log(error)
            return false;
        }
    }

}

module.exports = new User();