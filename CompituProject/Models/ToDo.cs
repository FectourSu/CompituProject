using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CompituProject.Models
{
    public class ToDo
    {
        private Guid guid;

        public ToDo()
        {
            guid = Guid.NewGuid();
        }

        public string Id => guid.ToString();

        public bool Completed { get; set; }

        [Required]
        public string Title { get; set; }
    }

    public class GlobalToDo : ToDo
    {
        public GlobalToDo()
        {
            ToDos = new List<ToDo>();
        }

        public string SubTitle { get; set; }

        public List<ToDo> ToDos { get; set; }

        public DateTime DateTime { get; set; }
    }
}
