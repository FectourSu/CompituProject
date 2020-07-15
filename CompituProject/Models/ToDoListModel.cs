using System;
using System.Collections.Generic;

namespace CompituProject.Models
{
    public class ToDoListModel
    {
        public ToDoListModel()
        {
            GlobalToDos = new List<GlobalToDo>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public List<GlobalToDo> GlobalToDos { get; set; }
    }
}
