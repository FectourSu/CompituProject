using CompituProject.Models;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompituProject.Helpers
{
    public static class JsHelper
    {
        public async static Task WriteLocalStorage(this IJSRuntime jSRuntime, List<ToDoListModel> mass)
        { 
            await jSRuntime.InvokeVoidAsync("blazorLocalStorage", mass);
        }
        public async static Task<List<ToDoListModel>> ReadLocalStorage(this IJSRuntime jSRuntime)
        {
            return await jSRuntime.InvokeAsync<List<ToDoListModel>>("blazorReadLocalStorage");
        }
        public async static Task DatePush(this IJSRuntime jSRuntime, IEnumerable<GlobalToDo> todo)
        {
            await jSRuntime.InvokeVoidAsync("blazorNotifSet", todo);
        }
    }
}
