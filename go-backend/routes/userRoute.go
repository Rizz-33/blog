package routes

import (
	"github.com/Rizz-33/blog/go-backend/controllers"
	"github.com/gorilla/mux"
)

func UserRoutes(router *mux.Router) {
    router.HandleFunc("/users", controllers.CreateUser).Methods("POST")
    router.HandleFunc("/users/{id}", controllers.GetUser).Methods("GET")
    router.HandleFunc("/users/{id}", controllers.UpdateUser).Methods("PUT")
    router.HandleFunc("/users/{id}", controllers.DeleteUser).Methods("DELETE")
}
