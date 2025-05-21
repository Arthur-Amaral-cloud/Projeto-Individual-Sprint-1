create database if not exists sudoku_com;

use sudoku_com;

create table if not exists player (
idPlayer int primary key auto_increment,
Username varchar(45) not null,
email varchar(100) not null,
senha varchar(500) not null
);

create table if not exists LogJogos (
idJogos int,
Fkplayer int,
constraint PkCompostaLogJogos primary key(idJogos, Fkplayer),
constraint FkPlayerJogos
foreign key (Fkplayer) references player(idPlayer),
QtdErros int not null,
TempodeJogo int not null,
JogoFinalizado tinyint default '0',
constraint chkJogoFinalizado
check(JogoFinalizado in('0','1'))
);

create table if not exists ListadeAmizades (
FkUsuario int,
FkAmigo int,
constraint PkCompostaListadeAmizades primary key (FkUsuario,FkAmigo),
constraint FkUsuarioPlayer
foreign key (FkUsuario) references player(idPlayer),
constraint FKAmigoPlayer 
foreign key (FkAmigo) references player(idPlayer),
DtAmizade datetime default current_timestamp
);
