using System;
using Microsoft.Extensions.Configuration;

namespace api.Helpers
{
    public class PostgresConnection
    {
        private readonly string _defaultConnection;

        public PostgresConnection(string defaultConnection)
        {
            _defaultConnection = defaultConnection;
        }

        public string GetConnectionString()
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            string connStr = _defaultConnection;

            // Depending on if in development or production, use either Heroku-provided
            // connection string, or development connection string from env var.
            if (env == "Development")
            {
                // Use connection string from file.
                connStr = _defaultConnection;
            }
            else
            {
                // Use connection string provided at runtime by Heroku.
                // var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                // // Parse connection URL to connection string for Npgsql
                // connUrl = connUrl.Replace("postgres://", string.Empty);
                // var pgUserPass = connUrl.Split("@")[0];
                // var pgHostPortDb = connUrl.Split("@")[1];
                // var pgHostPort = pgHostPortDb.Split("/")[0];
                // var pgDb = pgHostPortDb.Split("/")[1];
                // var pgUser = pgUserPass.Split(":")[0];
                // var pgPass = pgUserPass.Split(":")[1];
                // var pgHost = pgHostPort.Split(":")[0];
                // var pgPort = pgHostPort.Split(":")[1];

                // connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};SSL Mode=Require;TrustServerCertificate=True";

                // TODO: this should be refactored depending on how we connect via K8s to PSQL
                // Ideally, wouldn't be passing the entire connection string, rather necessary credentials
                // and construct string at startup
                connStr = Environment.GetEnvironmentVariable("DATABASE_URL");
            }

            return connStr;
        }


    }
}