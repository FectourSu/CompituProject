using Blazored.Modal;
using Blazored.Modal.Services;
using CompituProject.Helpers;
using CompituProject.Models;
using CompituProject.Services;
using CompituProject.Shared.Modals;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompituProject.Pages
{
    public partial class ToDoList
    {
        [CascadingParameter]
        public IModalService blazorModal { get; set; }

        [Inject]
        public IJSRuntime js { get; set; }

        [Inject]
        internal IToDoListService service { get; set; }

        [Parameter]
        public int Id { get; set; }

        public bool hiddenCompiled = true;

        /// <summary>
        /// Имя ToDoList
        /// </summary>
        public string Name { get; set; }

        public List<GlobalToDo> list = new List<GlobalToDo>();

        /// <summary>
        /// Id глобальной задачи
        /// </summary>
        private string GlobalToDoId = string.Empty;

        /// <summary>
        /// Выполняется после нажатия на кнопку Add в модальном окне AddGlobalToDoModal
        /// </summary>
        private async Task CallbackAddGlobalToDo(GlobalToDo toDo)
        {
            list.Add(toDo);

            await Save();
        }

        public void AddGlobalToDo()
        {
            var param = new ModalParameters();

            param.Add(nameof(AddGlobalToDoModal.CallbackAddToDo),
                EventCallback.Factory.Create<GlobalToDo>(this, CallbackAddGlobalToDo));

            var modal = blazorModal.Show<AddGlobalToDoModal>("Add task", param);
        }

        /// <summary>
        /// Выполняется после нажатия на кнопку Add в модальном окне AddToDoModal
        /// </summary>
        public async Task CallbackAddToDo(ToDo toDo)
        {

            list.First(l => l.Id == GlobalToDoId).ToDos.Add(toDo);

            await Save();
        }

        public void AddToDo(string id)
        {
            GlobalToDoId = id;

            var param = new ModalParameters();

            param.Add(nameof(AddToDoModal.CallbackAddToDo),
                EventCallback.Factory.Create<ToDo>(this, CallbackAddToDo));

            var modal = blazorModal.Show<AddToDoModal>("Add subtask", param);
        }

        /// <summary>
        /// Перезаписует список в LocalStorage
        /// </summary>
        public async Task Save()
        {
            await js.WriteLocalStorage(service.Get());
        }

        /// <summary>
        /// Отмечает все задачи как выполненные
        /// </summary>
        public async Task CompletedAll()
        {
            list.ForEach(i =>
            {
                i.Completed = true;
                i.ToDos.ForEach(j => j.Completed = true);
            });

            await Save();
        }

        protected override async Task OnInitializedAsync()
        {
            /// Обновление кнопки HamButton после закрытия Modal
            modal.Update += () => StateHasChanged();

            await service.ReadToDo();

        }

        protected override void OnParametersSet()
        {
            /// Если осуществляется переход на удалённый лист, то возвращаемся на главную
            try
            {
                var listModel = service.Get().Find(i => i.Id == Id);

                Name = listModel.Name;
                list = listModel.GlobalToDos;
            }
            catch
            {
                navigate.NavigateTo("/CompituProject/");
            }
        }
    }
}
