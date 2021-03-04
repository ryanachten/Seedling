using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Seedling
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                    if (env == "Development")
                    {
                        webBuilder.UseStartup<Startup>();
                    }
                    else
                    {
                        // In production, we want to use Heroku's PORT
                        // and let Heroku hadnle HTTPS redirection (hence only use HTTP in .NET)
                        var port = Environment.GetEnvironmentVariable("PORT");
                        webBuilder.UseStartup<Startup>().UseUrls("http://*:" + port);
                    }

                });
    }
}
