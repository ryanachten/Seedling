# Heroku and cotainer registery varaibles
IMAGE_NAME=ryanachten/seedling
APP_NAME=seedling-app-api

# printf "\n*** Publishing .NET project ***"
# dotnet publish -c Release 

printf "\n*** Building and tagging Docker image $IMAGE_NAME ***"
docker build -t $IMAGE_NAME -f DockerFile .
docker tag $IMAGE_NAME registry.heroku.com/$APP_NAME/web
docker push registry.heroku.com/$APP_NAME/web

printf "\n*** Releasing container ***"
heroku container:release web --app=$APP_NAME

printf "\n*** Opening app $APP_NAME ***"
heroku open --app=$APP_NAME
heroku logs --tail --app=$APP_NAME