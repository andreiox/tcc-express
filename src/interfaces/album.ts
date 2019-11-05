/*

CREATE TABLE SQL

create table albums (
    id varchar(36) primary key,
    name varchar(255) not null,
    singer_id varchar(36) not null,
    release_date timestamp not null,
    created_at timestamp not null
);
*/

export interface AlbumInterface {
    name: string
    singer_id: string
    release_date: Date

    id?: string
    created_at?: Date
}
