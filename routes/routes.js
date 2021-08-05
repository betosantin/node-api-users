var express = require("express")
var app = express();
var router = express.Router();
var UserController = require("../controllers/UserController");

router.get('/', (req, res) => {
    res.send("ola")
});

router.post('/user', UserController.create);
router.get('/user', UserController.index);
router.get('/users/:id', UserController.findById);

module.exports = router;