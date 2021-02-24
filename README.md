# Seedling

## API
### Installation
- Install Docker desktop. We use Linux containers for this repository.

### Running Docker container
- Pull image from Hub - `docker pull ryanachten/seedling`
- Run container (HTTP) - `docker run --rm -it -p 8000:80 ryanachten/seedling`
  - API will be available on http://localhost:8000/
- Run container (HTTPS - macOS) - `docker run --rm -it -p 8000:80 -p 8001:443 -e ASPNETCORE_URLS="https://+;http://+" -e ASPNETCORE_HTTPS_PORT=8001 -e ASPNETCORE_Kestrel__Certificates__Default__Password="YOUR PASSWORD" -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx -v ${HOME}/.aspnet/https:/https/ ryanachten/seedling`
  - Ensure `dotnet dev-certs` are set locally first
  - Be sure to replace `YOUR PASSWORD` with you administrator password
  - To prevent having to copy this command, we store this in a `start.sh` file (omitted from source control)
  - See [here](https://docs.microsoft.com/en-us/aspnet/core/security/docker-https?view=aspnetcore-5.0) for further information (such as Windows run guide)