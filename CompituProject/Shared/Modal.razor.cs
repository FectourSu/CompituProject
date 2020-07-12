using CompituProject.Models;
using CompituProject.Services;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CompituProject.Shared
{
    public partial class Modal
    {
        [Inject]
         IToDoListService service { get; set; }

        [Inject]
        private IMyModalService modal { get; set; }

        [Parameter]
        public List<ToDoListModel> ToDoLists { get; set; }

        private string cssClassShow = string.Empty;

        protected override void OnInitialized()
        {
            modal.Update += Update;
        }
        public async void Update()
        {
            if (modal.IsOpen.Value)
                cssClassShow = string.Empty;
            else
                cssClassShow = "show";
       
            await InvokeAsync(StateHasChanged);
        }
    }
}
