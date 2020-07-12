using System;

namespace CompituProject.Services
{
    public class ModalService : IMyModalService
    {
        public event Action Update;

        public bool? IsOpen { get; set; } = false;
     
        public void Click()
        {
            Update?.Invoke();

            IsOpen = !IsOpen;
        }
    }
}
