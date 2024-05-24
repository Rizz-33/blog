package controllers

import "net/http"

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User data retrieved"))
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User created"))
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User updated"))
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User deleted"))
}
