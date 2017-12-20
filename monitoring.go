package main

import (
	"database/sql"
	"log"
	"time"
	"strconv"
)

var Status replication

type replication struct {
	running             bool
	SlaveIORunning      string
	SlaveSQLRunning     string
	SecondsBehindMaster interface{}
	LastIOError         string
	GtidIOPos           interface{}
}


func StatusReplication() {
	sendMail := true

	for {
		rows, err := db.Query("show status like \"%Slave_running%\";")
		if err != nil {
			panic(err.Error())
		}

		var running string
		var value string

		for rows.Next() {
			err := rows.Scan(&running, &value)
			if err != nil {
				log.Fatal(err)
			}
		}

		slaveInfo := SlaveStatus()

		Status.SlaveSQLRunning = slaveInfo["Slave_SQL_Running"].(string)
		Status.SlaveIORunning = slaveInfo["Slave_IO_Running"].(string)
		Status.LastIOError = slaveInfo["Last_IO_Error"].(string)
		Status.SecondsBehindMaster = slaveInfo["Seconds_Behind_Master"]
		Status.LastIOError = slaveInfo["Last_IO_Error"].(string)
		Status.GtidIOPos = slaveInfo["Gtid_IO_Pos"]

		if value == "Yes" {
			Status.running = true
			sendMail = true
		}

		if value == "OFF" && mailSetting.To != "" {
			Status.running = false

			if sendMail {
				var text string
				for column, _ := range slaveInfo {
					text = text + column + "\n\r"
					//fmt.Println(column, value)
				}

				err := SendMail(text, "Error Replication!")
				if err != nil {
					panic(err.Error())
				}

				sendMail = false
			}

		}
		time.Sleep(1000 * time.Millisecond)
	}
}

func SlaveStatus() map[string]interface{} {
	rows, err := db.Query("SHOW SLAVE 'is' STATUS;")

	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}

	columns, _ := rows.Columns()

	values := make([]interface{}, len(columns))
	for i := range values {
		var v sql.RawBytes
		values[i] = &v
	}
	for rows.Next() {
		err = rows.Scan(values...)
		if err != nil {
			panic(err.Error())
		}
	}

	slaveInfo := make(map[string]interface{})

	for i, column := range columns {
		bp := values[i].(*sql.RawBytes)
		valueString := string(*bp)
		valueInt, err := strconv.ParseInt(valueString, 10, 64)
		if err != nil {
			slaveInfo[column] = valueString
		} else {
			slaveInfo[column] = valueInt
		}
	}
	return slaveInfo
}