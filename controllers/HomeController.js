class HomeController{

    async index(req, res){
        res.send("API TESTE");
    }

}

module.exports = new HomeController();