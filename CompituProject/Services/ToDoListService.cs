using CompituProject.Models;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CompituProject.Helpers;

namespace CompituProject.Services
{
    public class ToDoListService : IToDoListService
    {
        private static List<ToDoListModel> todoLists;

        private readonly IJSRuntime _jSRuntime;

        
        public ToDoListService(IJSRuntime jsRuntime)
        {
            this._jSRuntime = jsRuntime;
            todoLists = new List<ToDoListModel>();
        }

        public async  Task ReadToDo()
        {
            todoLists = await _jSRuntime.ReadLocalStorage();
        }

        public List<ToDoListModel> Get()
        {
            return todoLists;
        }

        public List<ToDoListModel> Delete(int selectedIndex)
        {
            if (todoLists.Count == 1)
                todoLists.Clear();
            else
                todoLists.Remove(todoLists.Find(i => i.Id == selectedIndex));

            return todoLists;
        }
        public void Add(ToDoListModel item)
        {
            if (item == null)
                throw new ArgumentNullException(nameof(item));

            item.Id = todoLists.Count();

            if (todoLists.Any(i => i.Id == item.Id))
                item.Id = todoLists.Max(i => i.Id) + 1;
                
            todoLists.Add(item);
        }
    }
}
