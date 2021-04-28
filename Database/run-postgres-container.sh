docker stop postgres || true && docker rm postgres || true
docker build -t postgres .
docker run \
-p 5432:5432 \
-e "POSTGRES_PASSWORD=fishfarm" \
-e "POSTGRES_USER=fishfarm" \
-e "POSTGRES_DB=fishfarm" \
-e "POSTGRES_PORT=5432" \
--name postgres \
postgres
