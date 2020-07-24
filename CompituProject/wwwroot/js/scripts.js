
window.blazorLocalStorage = (arr) => {
    localStorage.setItem("arr", JSON.stringify(arr));
}
window.blazorReadLocalStorage = () => {
    return localStorage.getItem("arr") ? JSON.parse(localStorage.getItem("arr")) : [];
}
function datePush(todo) {
    let arr = [];
    for (var i = 0; i < todo.length; i++) {
        if (!todo[i].completed)
        {
            var time = todo[i].dateTime;
            arr[i] = new Date(time).toLocaleDateString();

            for (var j = 0; j < arr.length; j++) {
                if (arr[i] == new Date().toLocaleDateString() || arr[i] < new Date().toLocaleDateString())
                {
                    notifyMe();
                    return;
                }
            }
        }
    }
}

function notifyMe() {
    var notification = new Notification("Compitu notifice", {
        tag: "ache-mail",
        body: "Your tasks are either not performed, or have become obsolete.\nHave time to complete them :)"
    });
}

window.blazorNotifSet = (todo) => {
    if (!("Notification" in window)){}
    else if (Notification.permission === "granted")
        datePush(todo);
    else if (Notification.permission !== "denied")
    {
        Notification.requestPermission(function (permission) {
            if (!("permission" in Notification))
                Notification.permission = permission;
            if (permission === "granted")
                datePush(todo);
        });
    }
}
