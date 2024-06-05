package routes

import (
	"github.com/Rizz-33/blog/go-backend/controllers"
	"github.com/gorilla/mux"
)

func UserRoutes(router *mux.Router) {
    router.HandleFunc("/user", controllers.CreateUser).Methods("POST")
    router.HandleFunc("/user", controllers.GetUser).Methods("GET")
    router.HandleFunc("/user", controllers.UpdateUser).Methods("PUT")
    router.HandleFunc("/user", controllers.DeleteUser).Methods("DELETE")
}
