package routes

import (
	"net/http"
)

func UserRoutes() {
	http.HandleFunc("/api/user", getUser)
	http.HandleFunc("/api/user/create", createUser)
	http.HandleFunc("/api/user/update", updateUser)
	http.HandleFunc("/api/user/delete", deleteUser)
}

func getUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User data retrieved"))
}

func createUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User created"))
}

func updateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User updated"))
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User deleted"))
}
