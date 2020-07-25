
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
                if (arr[i] == new Date().toLocaleDateString() || arr[i] < new Date().toLocaleDateString() && arr[i] != "01.01.1")
                {
                    showNotification();
                    return;
                }
            }
        }
    }
}

window.blazorNotifSet = (todo) => {
    if (!("Notification" in window)){return;}
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

function showNotification() {
    Notification.requestPermission(function (result) {
        if (result === 'granted') {
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification('Compitu notifice', {
                    body: 'Complete task, please :)',
                    icon: 'https://psv4.userapi.com/c856336/u155561278/docs/d13/b27e672b1446/document.png?extra=baPj9Vj32e-aWBnSX_ZYoKdF923s3j8yojbncD1yWwE8IO-R5l6NcV0v2zy9GzXa_Qr0LdItjzt05Ju1TxYaZRx199iLZynU0jYWsfXTNgjPIY5HM2pYN5w5pLwBKN42cijm5JiAgIDv7CLUb5odgJBg',
                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                    tag: 'vibration-sample'
                });
            });
        }
    });
}