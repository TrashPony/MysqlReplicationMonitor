function TestMail() {
    fetch('http://' + window.location.host + '/testMail',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin",
            body: JSON.stringify({
                msg: "testConfig"
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