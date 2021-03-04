# Seedling

## API
### Installation
- Install Docker desktop. We use Linux containers for this repository.
- Run postgres Docker container `docker run --name seedling-dev -e POSTGRES_USER=USER_NAME -e POSTGRES_PASSWORD=PASSWORD -d -p 5432:5432 postgres:latest`
- Install .NET CLI `v5.0.0`
- Install Entity Framework CLI tools `dotnet tool install --global dotnet-ef --version 5.0.0`
- Run `dotnet ef database update` to create/update local Psql DB

### Running .NET
- Run `dotnet watch run` from the `/api` directory
- Create EF migrations via `dotnet ef migrations add <NAME>`
- Update database via `dotnet ef database update`

### Running Docker container
- Pull image from Hub - `docker pull ryanachten/seedling`
- Run container (HTTP) - `docker run --rm -it -p 8000:80 ryanachten/seedling`
  - API will be available on http://localhost:8000/
- Run container (HTTPS - macOS) - `docker run --rm -it -p 8000:80 -p 8001:443 -e ASPNETCORE_URLS="https://+;http://+" -e ASPNETCORE_HTTPS_PORT=8001 -e ASPNETCORE_Kestrel__Certificates__Default__Password="YOUR PASSWORD" -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx -v ${HOME}/.aspnet/https:/https/ ryanachten/seedling`
  - Ensure `dotnet dev-certs` are set locally first
  - Be sure to replace `YOUR PASSWORD` with you administrator password
  - To prevent having to copy this command, we store this in a `start.sh` file (omitted from source control)
  - See [here](https://docs.microsoft.com/en-us/aspnet/core/security/docker-https?view=aspnetcore-5.0) for further information (such as Windows run guide)

### Deploying to Heroku
- Ensure the following are installed on local environment
  - `psql` - Postgress cmd line tools
  - `heroku` - Heroku cmd line tools
    - Login into Heroku via Heroku cmd line
- Run `./deploy.sh`. This will do the following
  - Build and tag Docker image
  - Push image to Heroku container registry before releasing it
  - Produce EF migration SQL script and run it against Heroku Postgres to ensure schema is up to date
  - Open dpeloyed Heroku app with logs