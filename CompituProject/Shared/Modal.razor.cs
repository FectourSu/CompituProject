using CompituProject.Models;
using CompituProject.Services;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace CompituProject.Shared
{
    public partial class Modal
    {
        [Inject]
        private IModalService modal { get; set; }

        [Parameter]
        public IEnumerable<ToDoListModel> ToDoLists { get; set; }

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
