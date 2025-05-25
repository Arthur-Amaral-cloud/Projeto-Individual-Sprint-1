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
router.get(`/obterjogoswins/:idplayer`, function (req,res) {
    usuarioController.obterjogoswins(req,res);
}) 
router.get(`/obtermediaerro/:idplayer`, function (req,res) {
    usuarioController.obtermediaerro(req,res);
}) 
router.get(`/obtertempodejogo/:idplayer`, function (req,res) {
    usuarioController.obtertempodejogo(req,res);
}) 
router.get(`/obterjogofacil/:idplayer`, function (req,res) {
    usuarioController.obterjogofacil(req,res);
}) 
router.get(`/obterjogomedio/:idplayer`, function (req,res) {
    usuarioController.obterjogomedio(req,res);
}) 
router.get(`/obterjogosdificil/:idplayer`, function (req,res) {
    usuarioController.obterjogosdificil(req,res);
}) 
router.get(`/obterjogograficos/:idplayer`, function (req,res) {
    usuarioController.obterjogograficos(req,res);
}) 
module.exports = router;

