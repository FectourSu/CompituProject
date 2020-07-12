using System;

namespace CompituProject.Models
{
    public class ToDoListModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Date => DateTime.Now.ToShortDateString();
    }
}
