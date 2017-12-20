package main

import (
	"encoding/json"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"html/template"
	"log"
	"net/http"
)

const PORT = ":8030"

type message struct {
	Msg string `json:"msg"`
}

type response struct {
	Status              bool        `json:"status"`
	SlaveIORunning      string      `json:"slave_io_running"`
	SlaveSQLRunning     string      `json:"slave_sql_running"`
	SecondsBehindMaster interface{} `json:"seconds_behind_master"`
	LastIOError         string      `json:"last_io_error"`
	GtidIOPos           interface{} `json:"gtid_io_pos"`
}


func main() {
	router := mux.NewRouter()
	router.HandleFunc("/", HeartSlave)
	router.HandleFunc("/setMail", SetMailConfig)
	router.HandleFunc("/getMail", GetMailConfig)
	router.HandleFunc("/testMail", TestMailConfig)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))
	log.Println("http server started on" + PORT)
	go StatusReplication()
	http.ListenAndServe(PORT, router)
}


func HeartSlave(w http.ResponseWriter, r *http.Request) {

	if r.Method == "GET" {
		t, _ := template.ParseFiles("./static/index.html")
		t.Execute(w, nil)
	}

	if r.Method == "POST" {

		decoder := json.NewDecoder(r.Body)
		var msg message
		err := decoder.Decode(&msg)
		if err != nil {
			panic(err)
		}

		if msg.Msg == "getStatusReplication" {

			status := Status.running

			if status {
				resp := response{Status: true, SlaveIORunning: Status.SlaveIORunning, SlaveSQLRunning: Status.SlaveSQLRunning, SecondsBehindMaster: Status.SecondsBehindMaster,
					LastIOError: Status.LastIOError, GtidIOPos: Status.GtidIOPos}

				json.NewEncoder(w).Encode(resp)
			} else {
				resp := response{Status: false, SlaveIORunning: Status.SlaveIORunning, SlaveSQLRunning: Status.SlaveSQLRunning, SecondsBehindMaster: Status.SecondsBehindMaster,
					LastIOError: Status.LastIOError, GtidIOPos: Status.GtidIOPos}

				json.NewEncoder(w).Encode(resp)
			}
		}
	}
}

