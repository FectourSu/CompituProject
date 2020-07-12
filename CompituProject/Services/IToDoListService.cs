using CompituProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompituProject.Services
{
    interface IToDoListService
    {
        List<ToDoListModel> Delete(int selectedIndex);
        Task ReadToDo();
        List<ToDoListModel> Get();
        void Add(ToDoListModel item);
    }
}
