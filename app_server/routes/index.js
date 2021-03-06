var express = require('express');
var router = express.Router();

/* GET home page. */
var ctrlMain = require('../controller/main');
router.get('/', ctrlMain.index);
module.exports=router;

var ctrlPerfil = require('../controller/main');
router.get('/perfil/:id',ctrlPerfil.perfil);
module.exports=router;

var ctrlFotografos = require('../controller/main');
router.get('/fotografos', ctrlFotografos.fotografos);
module.exports=router;

var ctrlCategoriasDefault = require('../controller/main');
router.get('/categorias', ctrlCategoriasDefault.renderCategoriasDefault);
module.exports=router;

var ctrlCategorias = require('../controller/main');
router.get('/categorias/:tag', ctrlCategorias.categorias);
module.exports=router;
