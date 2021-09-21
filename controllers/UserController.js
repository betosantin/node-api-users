const knex = require("../database/connection");
const User = require("../models/User");

class UserController {

    async index(req, res) {
        var users = await User.findAll();

        res.json(users)
    }

    async findById(req, res) {
        var user = await User.findById(req.params.id);

        if (user) {
            res.json(user);
        } else {
            res.status(404);
        }
    }

    async create(req, res) {
        var { email, name, password } = req.body;

        if (email == undefined) {
            res.status(400);
            res.json({ err: "O e-mail é inválido!" })
            return;
        }

        var emailExiste = await User.findEmail(email);

        if (emailExiste) {
            res.status(406);
            res.json({ err: "O e-mail já está cadastrado!" });
            return;
        }

        try {
            await User.new(email, password, name);

        } catch (error) {
            res.status(503);
            res.json({ err: error });
            return;
        }

        res.status(200);
        res.send("OK")
    }

    async edit(req, res){
        var { id, email, name, role } = req.body;

        var result = await User.update(id, email, name, role);

        if (result != undefined) {
            if (result.status) {
                res.status(200);
                res.send("OK");
            } else {
                res.status(406);
                res.send(result.err);
            }
        } else {
            res.status(500);
            res.send("Ocorreu um erro no servidor.");
        }
    }

    async delete(req, res){
        var { id } = req.body;

        if (id == undefined) {
            res.status(400);
            res.json({ err: "Informe um id." })
            return;
        }

        var result = await User.delete(id);

        if (result != undefined) {
            if (result.status) {
                res.status(200);
                res.send("OK");
            } else {
                res.status(406);
                res.send(result.err);
            }
        } else {
            res.status(500);
            res.send("Ocorreu um erro no servidor.");
        }
    }
}

module.exports = new UserController();