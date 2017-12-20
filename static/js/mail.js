function MailWindow(){

    var oldTable = document.getElementById("emailSetting");

    if (oldTable) {
        oldTable.parentNode.removeChild(oldTable)
    }

    var parent = document.getElementById("mailSettings");
    var table = document.createElement('table');

    table.className = "animateTable";
    table.id = "emailSetting";

    var row1 = document.createElement("tr");
    var hMail= document.createElement("th");

    hMail.colSpan = 2;
    hMail.innerHTML = "Настройка почты для уведомления:";
    row1.appendChild(hMail);
    table.appendChild(row1);

    var row2 = document.createElement("tr");
    row2.appendChild(createHeadTD("Почта для отправки:"));
    row2.appendChild(createInputTD("Email", "Email"));
    table.appendChild(row2);

    var row3 = document.createElement("tr");
    row3.appendChild(createHeadTD("Smtp сервер:"));
    row3.appendChild(createInputTD("smtp.ololo.com", "smtpServer"));
    table.appendChild(row3);

    var row4 = document.createElement("tr");
    row4.appendChild(createHeadTD("Smtp порт:"));
    row4.appendChild(createInputTD("25", "smtpPort"));
    table.appendChild(row4);

    var row5 = document.createElement("tr");
    row5.appendChild(createHeadTD("Пользователь:"));
    row5.appendChild(createInputTD("user", "userName"));
    table.appendChild(row5);

    var row6 = document.createElement("tr");
    row6.appendChild(createHeadTD("Пароль:"));
    row6.appendChild(createInputTD("password", "userPassword"));
    table.appendChild(row6);

    var row7 = document.createElement("tr");
    row7.appendChild(createHeadTD("Кому:"));
    row7.appendChild(createInputTD("Email", "toMail"));
    table.appendChild(row7);

    var row8 = document.createElement("tr");
    row8.appendChild(createButtonTD("Отмена", "cancel"));
    row8.appendChild(createButtonTD("Применить", "ok"));
    table.appendChild(row8);

    parent.appendChild(table);
}

function createHeadTD(value) {
    var td = document.createElement("td");
    td.innerHTML = value;
    td.align = "right";
    return td
}

function createInputTD(value, id) {
    var td = document.createElement("td");
    var input = document.createElement("input");
    input.type = "text";
    input.name = id;
    input.placeholder = value;
    input.id = id;
    td.appendChild(input);
    return td
}

function createButtonTD(value, func) {
    var td = document.createElement("td");
    td.align = "center";
    td.style.paddingTop = "10px";
    var button = document.createElement("input");
    button.type = "submit";
    button.className = "button";
    button.value = value;

    if (func === "cancel") {
        button.onclick = Cancel;
    }

    if (func === "ok") {
        button.onclick = sendEmailSettings;
    }

    td.appendChild(button);
    return td
}

function Cancel() {
    var oldTable = document.getElementById("emailSetting");
    oldTable.parentNode.removeChild(oldTable);
}