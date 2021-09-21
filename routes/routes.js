var express = require("express");
const { route } = require("express/lib/application");
var app = express();
var router = express.Router();
var UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth");

router.get('/', (req, res) => {
    res.send("ola")
});

router.post('/user', UserController.create);
router.get('/user', AdminAuth, UserController.index);
router.get('/users/:id', AdminAuth, UserController.findById);
router.put('/user', AdminAuth, UserController.edit);
router.delete('/user', AdminAuth, UserController.delete);

router.post('/recoverpassword', UserController.recoverPassword);
router.post('/changepassword', UserController.changePassword);

router.post('/login', UserController.longin);

module.exports = router;