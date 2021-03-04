# Heroku and cotainer registery varaibles
IMAGE_NAME=ryanachten/seedling
APP_NAME=seedling-app-api

printf "\n*** Building and tagging Docker image $IMAGE_NAME ***\n"
docker build -t $IMAGE_NAME -f DockerFile .
docker tag $IMAGE_NAME registry.heroku.com/$APP_NAME/web
docker push registry.heroku.com/$APP_NAME/web

printf "\n*** Releasing container ***\n"
heroku container:release web --app=$APP_NAME

printf "\n*** Deploying latest EF migration to Postgres ***\n"
dotnet ef migrations script -o migration.sql --idempotent
heroku pg:psql --app seedling-app-api < migration.sql 

printf "\n*** Opening app $APP_NAME ***\n"
heroku open --app=$APP_NAME /plant
heroku logs --tail --app=$APP_NAME