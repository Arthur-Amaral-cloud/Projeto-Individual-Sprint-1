var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        if (resultadoAutenticar.length == 1) {
                            res.json({
                                idplayer: resultadoAutenticar[0].idplayer,
                                email: resultadoAutenticar[0].email,
                                username: resultadoAutenticar[0].username,
                            });
                        }
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var email = req.body.email;
    var username = req.body.username;
    var senha = req.body.senha;

    // Faça as validações dos valores
    if (username == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(email, username, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function captarusername(req, res) {
    var idplayer = req.body.idplayer;
    if (idplayer == undefined) {
        res.status(400).send("Seu idplayer está undefined!");
    }
    else {
        usuarioModel.captarusername(idplayer)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }

}
function obtertempodejogo(req, res) {
    var idplayer = req.params.idplayer;
    if (idplayer == undefined) {
        res.status(400).send("Seu idplayer está undefined!");
    }
    else {
        usuarioModel.obtertempodejogo(idplayer)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }

}

function comecarjogo(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.id;
    var dificuldade = req.body.dificuldade;

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (dificuldade == undefined) {
        res.status(400).send("Seu dificuldade está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.comecarjogo(id, dificuldade)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function errosup(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.id;
    var erros = req.body.erros;
    var idJogo = req.body.idplayer;

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (erros == undefined) {
        res.status(400).send("Seu erros está undefined!");
    } else if (idJogo == undefined) {
        res.status(400).send("Seu idJogo está undefined!");
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.errosup(id, erros, idJogo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function obteridjogo(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idjogador = req.params.idplayer;

    // Faça as validações dos valores
    if (idjogador == undefined) {
        res.status(400).send("Seu idJogador está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.obteridjogo(idjogador)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function obterjogoswins(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idjogador = req.params.idplayer;

    // Faça as validações dos valores
    if (idjogador == undefined) {
        res.status(400).send("Seu idJogador está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.obterjogoswins(idjogador)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function obtermediaerro(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idjogador = req.params.idplayer;

    // Faça as validações dos valores
    if (idjogador == undefined) {
        res.status(400).send("Seu idJogador está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.obtermediaerro(idjogador)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function obterjogofacil(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idjogador = req.params.idplayer;

    // Faça as validações dos valores
    if (idjogador == undefined) {
        res.status(400).send("Seu idJogador está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.obterjogofacil(idjogador)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function obterjogomedio(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idjogador = req.params.idplayer;

    // Faça as validações dos valores
    if (idjogador == undefined) {
        res.status(400).send("Seu idJogador está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.obterjogomedio(idjogador)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function obterjogosdificil(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idjogador = req.params.idplayer;

    // Faça as validações dos valores
    if (idjogador == undefined) {
        res.status(400).send("Seu idJogador está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.obterjogosdificil(idjogador)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function obterjogograficos(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idjogador = req.params.idplayer;

    // Faça as validações dos valores
    if (idjogador == undefined) {
        res.status(400).send("Seu idJogador está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.obterjogograficos(idjogador)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function updatewin(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.id;
    var win = req.body.win;
    var idJogo = req.body.idplayer;

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (win == undefined) {
        res.status(400).send("Seu win está undefined!");
    } else if (idJogo == undefined) {
        res.status(400).send("Seu idJogo está undefined!");
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.updatewin(id, win, idJogo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function updatetempo(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.id;
    var tempo = req.body.tempo;
    var idJogo = req.body.idplayer;

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (tempo == undefined) {
        res.status(400).send("Seu tempo está undefined!");
    } else if (idJogo == undefined) {
        res.status(400).send("Seu idJogo está undefined!");
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.updatetempo(id, tempo, idJogo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function inserirpost(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.id;
    var titulo = req.body.titulo;
    var postagem = req.body.postagem;

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (titulo == undefined) {
        res.status(400).send("Seu titulo está undefined!");
    } else if (postagem == undefined) {
        res.status(400).send("Sua postagem está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.inserirpost(id, titulo, postagem)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function obterpermissao(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idjogador = req.params.idplayer;

    // Faça as validações dos valores
    if (idjogador == undefined) {
        res.status(400).send("Seu idJogador está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.obterpermissao(idjogador)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function obterdadosforum(req, res) {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.obterdadosforum()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function atualizarvisibilidade(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.id;
    var visibilidade = req.body.visibilidade

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (visibilidade == undefined) {
        res.status(400).send("Seu visibilidade está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.atualizarvisibilidade(id, visibilidade)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function puxaremailexistentes(req, res) {
        usuarioModel.puxaremailexistentes()
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

module.exports = {
    autenticar,
    cadastrar,
    captarusername,
    comecarjogo,
    obteridjogo,
    errosup,
    updatewin,
    updatetempo,
    obterjogoswins,
    obtermediaerro,
    obtertempodejogo,
    obterjogofacil,
    obterjogomedio,
    obterjogosdificil,
    obterjogograficos,
    inserirpost,
    obterpermissao,
    obterdadosforum,
    atualizarvisibilidade,
    puxaremailexistentes

}