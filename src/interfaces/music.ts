/*

CREATE TABLE SQL

create table musics (
    id varchar(36) primary key,
    name varchar(255) not null,
    length_in_seconds integer not null,
    album_id varchar(36) not null,
    singer_id varchar(36) not null,
    created_at timestamp not null
);
*/

export interface MusicInterface {
    name: string
    length_in_seconds: number
    album_id: string
    singer_id: string

    id?: string
    created_at?: Date
}
