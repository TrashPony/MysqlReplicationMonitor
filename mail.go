package main

import (
	"net/http"
	"encoding/json"
	"gomail-master"
	"crypto/tls"
)

type MailSetting struct {
	From string `json:"from"`
	To string	`json:"to"`
	Text string	`json:"text"`
	SmtpServer string `json:"smtp_server"`
	SmtpPort int	`json:"smtp_port"`
	UserName string	`json:"user_name"`
	Password string `json:"password"`
	Status bool `json:"status"`
}

var mailSetting MailSetting

func SetMailConfig(w http.ResponseWriter, r *http.Request)  {
	if r.Method == "POST" {
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&mailSetting)

		if err != nil {
			panic(err)
		}

		resp := MailSetting{From: mailSetting.From, To: mailSetting.To, Status: mailSetting.Status}
		json.NewEncoder(w).Encode(resp)
	}
}

func GetMailConfig(w http.ResponseWriter, r *http.Request)  {
	if r.Method == "POST" {
		resp := MailSetting{From: mailSetting.From, To: mailSetting.To, Status: mailSetting.Status}
		json.NewEncoder(w).Encode(resp)
	}
}

func TestMailConfig(w http.ResponseWriter, r *http.Request)  {
	if r.Method == "POST" {
		decoder := json.NewDecoder(r.Body)
		var msg message
		err := decoder.Decode(&msg)
		if err != nil {
			panic(err)
		}

		if msg.Msg == "testConfig" {
			err := SendMail("", "TestMonitorMessage")
			if err != nil {
				mailSetting.Status = false

				resp := MailSetting{From: mailSetting.From, To: mailSetting.To, Status: mailSetting.Status}
				json.NewEncoder(w).Encode(resp)
			} else {
				mailSetting.Status = true

				resp := MailSetting{From: mailSetting.From, To: mailSetting.To, Status: mailSetting.Status}
				json.NewEncoder(w).Encode(resp)
			}
		}
	}
}


func SendMail(Text, Subject string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", mailSetting.From)
	m.SetHeader("To", mailSetting.To)
	m.SetHeader("Subject", Subject)
	m.SetBody("text/html", Text)

	d := gomail.NewDialer(mailSetting.SmtpServer, mailSetting.SmtpPort, mailSetting.UserName, mailSetting.Password)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}
	err := d.DialAndSend(m)
	if err != nil {
		return err
	} else {
		return err
	}
}