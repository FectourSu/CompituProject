using Blazored.Modal;
using CompituProject.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using System.Threading.Tasks;

namespace CompituProject
{
    public class AddToDoModal<TItem> : ComponentBase
        where TItem : ToDo, new()
    {
        [CascadingParameter]
        BlazoredModalInstance BlazoredModal { get; set; }

        [Parameter]
        public EventCallback<TItem> CallbackAddToDo { get; set; }

        public TItem toDo = new TItem();

        public async Task lazyKey(KeyboardEventArgs keyboard)
        {
            if (keyboard.Key == "Enter")
                await AddToDo();
        }

        public async Task AddToDo()
        {
            if (CallbackAddToDo.HasDelegate)
                await CallbackAddToDo.InvokeAsync(toDo);

            BlazoredModal.Close();
        }
    }
}
