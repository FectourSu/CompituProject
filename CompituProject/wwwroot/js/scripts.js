
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
        body: "Your tasks are either not performed, or have become obsolete.\nHave time to complete them :)",
        icon: "https://psv4.userapi.com/c856336/u155561278/docs/d13/45c862de4b57/document.png?extra=QBiBmcf-QucKeJiYGgtpFBJBBUas2UK8TjOArTQaeJApWEwLWLat8oUI88cdRrCkt8pGwOJK4AIsqFKUUmVB0PcBo4xbCYyIAES8M4IV80xZqrX_p6xswjrQa9hB62gqDeWuWRxSEjRpsPKl9HQzv2hkOQ"
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