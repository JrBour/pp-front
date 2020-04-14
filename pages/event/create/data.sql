INSERT INTO "users" ("id", "image_id", "given_name", "last_name", "phone", "email", "password", "created_at", "updated_at") VALUES
(1,	1,	'Jeremy',	'Bourel',	'0123456789',	'coucou@coucou.com',	'$argon2i$v=19$m=65536,t=4,p=1$UFlCYWxCZVZRRC5pUkV4Qw$eqG38DxyCHZV+uc7C6K9TQ9YY5DeFLX5zMgqnoehNMA',	'2020-04-10 14:55:27',	'2020-04-10 14:55:28'),
(2,	NULL,	'string',	'string',	'string',	'string',	'$argon2i$v=19$m=65536,t=4,p=1$dHJUTFg5L3JJUDhFdy42Yg$CpuTARDzESxqyLuKBxjM/k/k0G4tYqXqEPoOrIGGtKo',	'2020-04-13 14:55:56',	'2020-04-13 14:55:56'),
(5,	NULL,	'Eloise',	'Monjet',	'0123456789',	'elo@gmail.com',	'$argon2i$v=19$m=65536,t=4,p=1$a0hieDRTWnhKUWlsY1dERg$74driSQxdBVucp97V0emM7FLHmovTAM8e2iNfJxLT5w',	'2020-04-13 15:03:43',	'2020-04-13 15:03:43'),
(3,	2,	'Johanna',	'Loki',	'0123456789',	'coucou@coucous.com',	'$argon2i$v=19$m=65536,t=4,p=1$S0VqQ3FSTGNZV1MyMWNZZg$qfx3im8AGkR4XavHURWo/32MitLtrJBlduD3lIprT1Q',	'2020-04-13 14:59:41',	'2020-04-13 14:59:42'),
(4,	NULL,	'Hello',	'World',	'0123456789',	'hello@coucou.com',	'$argon2i$v=19$m=65536,t=4,p=1$eE1qdEJqVU9ucDQ3NEMyVQ$8ZhnB05TkxKKYRcX+k9VxhdGOTfgPDcCgH5MYKtBX28',	'2020-04-13 15:00:39',	'2020-04-13 15:00:39');


INSERT INTO "media_object" ("id", "file_path") VALUES
(1,	'5e9088e034b77_bridou.jpg'),
(2,	'5e947e5e1add5_Screenshot_2020-03-31 Sodexo - Benefits Platform(1).png'),
(3,	'5e962be81a251_bridou.jpg'),
(4,	'5e962c7432a34_bridou.jpg'),
(5,	'5e962cafad06c_bridou.jpg');