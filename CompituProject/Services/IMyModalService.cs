using System;

namespace CompituProject.Services
{
    public interface IMyModalService
    {
        event Action Update;

        bool? IsOpen { get; set; }

        void Click();
    }
}
