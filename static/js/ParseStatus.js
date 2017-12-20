function ParseStatus(response) {
    var statusDiv = document.getElementById("status");
    var SlaveIORunning = document.getElementById("SlaveIORunning");
    var SlaveSQLRunning = document.getElementById("SlaveSQLRunning");
    var SecondsBehindMaster = document.getElementById("SecondsBehindMaster");
    var GtidIOPos = document.getElementById("GtidIOPos");

    GtidIOPos.innerHTML = response.gtid_io_pos;
    GtidIOPos.className = "Value";

    if (response.last_io_error !== "") {
        var main = document.getElementById("error");
        var LastIOError = document.createElement('div');
        LastIOError.innerHTML = response.last_io_error;
        LastIOError.className = "Failed";
        LastIOError.id = "LastIOError";
        main.appendChild(LastIOError);
    }

    if (response.seconds_behind_master === "") {
        SecondsBehindMaster.innerHTML = "Null";
        SecondsBehindMaster.className = "Failed";
    } else {
        SecondsBehindMaster.innerHTML = response.seconds_behind_master;
        SecondsBehindMaster.className = "Success";
    }

    if (response.slave_sql_running === "Yes") {
        SlaveIORunning.innerHTML = response.slave_io_running;
        SlaveIORunning.className = "Success";
    }

    if (response.slave_io_running === "No") {
        SlaveIORunning.innerHTML = response.slave_io_running;
        SlaveIORunning.className = "Failed";
    }

    if (response.slave_sql_running === "Yes") {
        SlaveSQLRunning.innerHTML = response.slave_sql_running;
        SlaveSQLRunning.className = "Success";
    }

    if (response.slave_sql_running === "No") {
        SlaveSQLRunning.innerHTML = response.slave_sql_running;
        SlaveSQLRunning.className = "Failed";
    }

    if (response.status) {
        statusDiv.innerHTML = "Success";
        statusDiv.className = "Success";
    } else {
        statusDiv.innerHTML = "Failed";
        statusDiv.className = "Failed";
    }
}