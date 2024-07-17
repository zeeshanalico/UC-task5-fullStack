create type StatusI as ENUM ('show','hide');
create table items_list(
	id VARCHAR( 255 ) primary key,
	title varchar(255) unique not null,
	duration int not null default 34,
	link varchar(255) not null,
	status StatusI default 'show'
);