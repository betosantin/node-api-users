const knex = require("../database/connection");
const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const secret = "aquipalavrasecretaparageracaodotokenteste";

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

        var user = await User.findEmail(email);

        if (user != undefined) {
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

    async recoverPassword(req, res){
        var email = req.body.email;

        var result = await PasswordToken.create(email);

        if(result.status){
            res.status(200);
            res.send("{ \"token\": " + result.token +" }");

        } else {
            res.status(406);
            res.send(result.err);
        }
    }

    async changePassword(req, res){
        var token = req.body.token;
        var password = req.body.password;

        var valid = await PasswordToken.validateToken(token);

        if(valid.status){
            await User.changePassword(password, valid.token.user_id, valid.token.token);
            res.status(200);
            res.send("Senha alterada com sucesso.");

        } else {
            res.status(406);
            res.send("Token inválido");
        }
    }

    async longin(req, res){
        var {email, password} = req.body;

        var user = await User.findEmail(email);

        if(user != null) {
            if(await bcrypt.compare(password, user.password)){

                var token = jwt.sign({email: user.email, role: user.role}, secret);

                res.status(200);
                res.json({token: token});
            } else {
                res.status(406);
                res.send("Usuário/senha inválido.");
            }
        } else {
            res.status(406);
            res.send("Usuário/senha inválido.");
        }
    }
}

module.exports = new UserController();