var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/captarusername", function (req,res){
    usuarioController.captarusername(req,res);
}) 
router.post("/comecarjogo", function (req,res){
    usuarioController.comecarjogo(req,res);
});
router.put("/errosup", function (req,res) {
    usuarioController.errosup(req,res);
}) 
router.get(`/obteridjogo/:idplayer`, function (req,res) {
    usuarioController.obteridjogo(req,res);
}) 
router.put("/updatewin", function (req,res) {
    usuarioController.updatewin(req,res);
}) 
router.put("/updatetempo", function (req,res) {
    usuarioController.updatetempo(req,res);
}) 
module.exports = router;
