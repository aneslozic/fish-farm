CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS "FishFarm" (
    "Id" uuid default uuid_generate_v4(),
    "Name" VARCHAR (255) NOT NULL,
    "Latitude" NUMERIC (4),
    "Longitude" NUMERIC (4),
    "NumberOfCages" integer,
    "Picture" text,
    "Barge" BOOLEAN NOT NULL,
    primary key ("Id")
);
CREATE TABLE IF NOT EXISTS "User" (
    "Id" uuid default uuid_generate_v4(),
    "Name" VARCHAR ( 255 ) NOT NULL,
    "Picture" text,
    "Age" integer NOT NULL,
    "Email" text,
    "Position" VARCHAR (50) NOT NULL,
    "CertifiedUntil" timestamptz,
    "FishFarmId" uuid NOT NULL,
    primary key ("Id"),
    foreign key ("FishFarmId") references "FishFarm"("Id") ON DELETE CASCADE
);