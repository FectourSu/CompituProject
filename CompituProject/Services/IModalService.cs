using System;

namespace CompituProject.Services
{
    public interface IModalService
    {
        event Action Update;

        bool? IsOpen { get; set; }

        void Click();
    }
}
