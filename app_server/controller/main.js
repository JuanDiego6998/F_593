var request = require('request');
var apiOptions = {
	server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://F_593.herokuapp.com';
}

var renderHome = function (req, res, fotografos) {
	res.render('index', {
		title: 'Home',
		fotografos: fotografos,
		urldestacadas: [
			fotografos[0].fotos[0].url,
			fotografos[1].fotos[0].url,
			fotografos[2].fotos[0].url
		],
		categorias: [
			'Paisaje',
			'Retrato',
			'Naturaleza',
			'Arquitectura',
			'Periodismo'
		],
		fotosdestacadas: [{
			urlfoto: fotografos[0].fotos[0].url,
			fotografo: fotografos[0].nombre,
			id: fotografos[0]._id
		},
		{
			urlfoto: fotografos[1].fotos[0].url,
			fotografo: fotografos[1].nombre,
			id: fotografos[1]._id
		},
		{
			urlfoto: fotografos[2].fotos[0].url,
			fotografo: fotografos[2].nombre,
			id: fotografos[2]._id
		}
		]
	});
}

module.exports.index = function (req, res) {
	var requestOptionsOne;
	var pathOne = apiOptions.server + '/api/fotografos/fotos/all';
	requestOptionsOne = {
		url: pathOne,
		method: 'GET',
		json: {}
	};
	request(
		requestOptionsOne,
		function (err, response, body) {
			renderHome(req, res, body);
		}
	);
}

var renderPerfil = function (req, res, body) {
	res.render('perfil', {
		title: 'Perfil',
		urlfotofondo: body.fotos[Math.floor(Math.random()*body.fotos.length)].url,
		urlfotoperfil: body.fotoperfil,
		nombre: body.nombre,
		bio: body.bio,
		fotos: body.fotos
	});
}

module.exports.perfil = function (req, res) {
	var requestOptions, path;
	path = '/api/fotografos/' + req.params.id;
	requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		function(err, response, body){
			renderPerfil(req, res, body);
		}
	)
}

var renderFotografos = function(req, res, body){
	res.render('fotografos', {
		title: 'Fotografos',
		urlfotofondo: 'img/paisaje.jpg',
		fotografos: body
	})
}

module.exports.fotografos = function (req, res) {
	var requestOptions, path;
	path = '/api/fotografos';
	requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		function(err, response, body){
			renderFotografos(req, res, body);
		}
	);
}

var renderCategorias = function (req, res, foto1) {
	res.render('categorias', {
		title: 'Categorias',
		fotos: foto1,
		urlfotofondo: foto1[Math.floor(Math.random()*foto1.length)].fotos[Math.floor(Math.random()*foto1[Math.floor(Math.random()*foto1.length)].fotos.length)].url,
		categorias: [
			'Paisaje',
			'Retrato',
			'Naturaleza',
			'Arquitectura',
			'Periodismo'
		]
	});
}

module.exports.renderCategoriasDefault = function(req, res){
	res.render('categorias', {
		title: 'Categorias',
		urlfotofondo: 'img/AntelopeValley-1.jpg',
		categorias: [
			'Paisaje',
			'Retrato',
			'Naturaleza',
			'Arquitectura',
			'Periodismo'
		]
	});
}

module.exports.categorias = function (req, res) {
	var requestOptions, path;
	path = '/api/fotografos/fotos/' + req.params.tag;
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
	};
	request(
		requestOptions,
		function (err, response, body) {
			renderCategorias(req, res, body);
			console.log(body);
		}
	);
}
