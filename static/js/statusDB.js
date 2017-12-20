function Status() {
    fetch('http://' + window.location.host + '/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin",
            body: JSON.stringify({
                msg: "getStatusReplication"
            })
        }).then(function(response) {
        if (!response.ok) {
            return Promise.reject(new Error(
                'Response failed: ' + response.status + ' (' + response.statusText + ')'
            ));
        }
        return response.json();
    }).then(function(data) {
        ReadResponse(data)
    }).catch(function(error) {
        console.log(error)
    });
    GetMailConfig();
}

function ReadResponse(response) {
    console.log(response);
    ParseStatus(response);
}