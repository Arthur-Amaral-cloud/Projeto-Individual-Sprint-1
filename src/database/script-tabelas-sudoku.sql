create database if not exists sudoku_com;

use sudoku_com;

create table if not exists player (
idPlayer int primary key auto_increment,
username varchar(45) not null,
email varchar(100) not null unique,
senha varchar(500) not null
);

create table if not exists LogJogos (
idJogos int auto_increment,
Fkplayer int,
constraint PkCompostaLogJogos primary key(idJogos, Fkplayer),
constraint FkPlayerJogos
foreign key (Fkplayer) references player(idPlayer),
QtdErros int not null,
Dificuldade varchar(45) not null,
constraint chkDificuldade
check(Dificuldade in('Fácil','Médio','Díficil')),
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

select * from player;

select username from player where idPlayer = 1;

insert into LogJogos(Fkplayer,QtdErros,Dificuldade,TempodeJogo,JogoFinalizado) values ('1',0,'Médio',0,0);

select * from LogJogos;

select max(idJogos) from LogJogos where Fkplayer = 1 and JogoFinalizado = 0;