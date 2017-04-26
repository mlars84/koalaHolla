create table koalas (

	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(12) UNIQUE,
	sex VARCHAR(1),
	age SMALLINT,
	ready_for_transfer BOOLEAN,
	notes TEXT
);

INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ('Scotty','M',4,'Y','Born in Guatemala');
INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ('Jean','F',5,'Y','Allergic to lots of lava');
INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ('Ororo','F',7,'N','loves listening to Paula (Abdul)');
INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ('Logan','M',15,'N','Love the sauna');
INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ('Charlie','M',9,'Y','Favorite band is Nirvana');
INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ('Betsy','F',4,'Y','Has a pet iguana');
