
function sendEmailSettings() {
    var form = document.getElementById("mailSettings");
    var formData = new FormData(form);

    fetch('http://' + window.location.host + '/setMail',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin",
            body: JSON.stringify({
                from:           formData.get("Email"),
                to:             formData.get("toMail"),
                smtp_server:    formData.get("smtpServer"),
                smtp_port:      Number(formData.get("smtpPort")),
                user_name:      formData.get("userName"),
                password:       formData.get("userPassword")
            })
        }).then(function(response) {
        if (!response.ok) {
            return Promise.reject(new Error(
                'Response failed: ' + response.status + ' (' + response.statusText + ')'
            ));
        }
        return response.json();
    }).then(function(data) {
        ViewMail(data)
    }).catch(function(error) {
        console.log(error)
    });
}

function GetMailConfig() {
    fetch('http://' + window.location.host + '/getMail',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin"
        }).then(function(response) {
        if (!response.ok) {
            return Promise.reject(new Error(
                'Response failed: ' + response.status + ' (' + response.statusText + ')'
            ));
        }
        return response.json();
    }).then(function(data) {
        ViewMail(data)
    }).catch(function(error) {
        console.log(error)
    });
}

function ViewMail(data) {
    console.log(data);
    var status = document.getElementById("testMail");

    if (data.status) {
        status.innerText = "Ok";
        status.className = "Success";
    } else {
        status.innerText = "Failed";
        status.className = "Failed";
    }

    var from = document.getElementById("viewFrom");
    from.className = "Value";
    from.innerText = data.from;

    var to = document.getElementById("viewTo");
    to.className = "Value";
    to.innerText = data.to;
}