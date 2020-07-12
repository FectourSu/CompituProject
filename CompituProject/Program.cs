using CompituProject.Services;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Blazored.Modal;

namespace CompituProject
{

    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("app");

            builder.Services.AddTransient(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.Services.AddScoped<IMyModalService, ModalService>();
            builder.Services.AddSingleton<IToDoListService, ToDoListService>();
            builder.Services.AddBlazoredModal();

            await builder.Build().RunAsync();
        }
    }
}
