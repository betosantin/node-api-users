var express = require("express");
const { route } = require("express/lib/application");
var app = express();
var router = express.Router();
var UserController = require("../controllers/UserController");

router.get('/', (req, res) => {
    res.send("ola")
});

router.post('/user', UserController.create);
router.get('/user', UserController.index);
router.get('/users/:id', UserController.findById);
router.put('/user', UserController.edit);
router.delete('/user', UserController.delete);

router.post('/recoverpassword', UserController.recoverPassword);
router.post('/changepassword', UserController.changePassword);

router.post('/login', UserController.longin);

module.exports = router;