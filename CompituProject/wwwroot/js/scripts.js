
window.blazorLocalStorage = (arr) => {
    localStorage.setItem("arr", JSON.stringify(arr));
}
window.blazorReadLocalStorage = () => {
    return localStorage.getItem("arr") ? JSON.parse(localStorage.getItem("arr")) : [];
}

function datePush(todo) {
    let dates = [];
    let notCompleted = todo.filter(s => !s.completed);
    for (var i = 0; i < notCompleted.length; i++) {
        var time = notCompleted[i].dateTime;
        dates[i] = new Date(time);

        for (var j = 0; j < dates.length; j++) {
            if (dates[i] <= new Date() && dates[i] != "01.01.1")
                {
                    showNotification(notCompleted[i].title);
                    return;
                }
            }
    }
}

function showPCnotification(title) {
    var notification = new Notification("Compitu notifice", {
        tag: "ache-mail",
        body: "Время задачи: " + title + " истекло"
    });
}

window.blazorNotifSet = (todo) => {
    Notification.requestPermission(function (result) {
        if (result === 'granted') {
            datePush(todo);
        }
    });
}

function showNotification(title) {
    Notification.requestPermission(function (result) {
        if (result === 'granted') {
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification('Compitu notifice', {
                    body: "Время задачи: " + title + " истекло",
                    icon: 'https://psv4.userapi.com/c856336/u155561278/docs/d13/b27e672b1446/document.png?extra=baPj9Vj32e-aWBnSX_ZYoKdF923s3j8yojbncD1yWwE8IO-R5l6NcV0v2zy9GzXa_Qr0LdItjzt05Ju1TxYaZRx199iLZynU0jYWsfXTNgjPIY5HM2pYN5w5pLwBKN42cijm5JiAgIDv7CLUb5odgJBg',
                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                    tag: 'vibration-sample'

                });
            });
        }
    });
}