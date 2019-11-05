/*

CREATE TABLE SQL

create table singers (
    id varchar(36) primary key,
    name varchar(255) not null,
    artistic_name varchar(255) not null,
    birthday timestamp not null,
    country varchar(255) not null,
    age integer not null,
    created_at timestamp not null,
);
*/

export interface SingerInterface {
    name: string
    artistic_name: string
    birthday: Date
    country: string
    age: number

    id?: string
    created_at?: Date
}
