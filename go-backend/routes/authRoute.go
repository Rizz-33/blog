package routes

import (
	"github.com/Rizz-33/blog/go-backend/controllers"
	"github.com/gorilla/mux"
)

func AuthRoutes(router *mux.Router) {
	router.HandleFunc("/api/signup", controllers.SignUp).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/signin", controllers.SignIn).Methods("POST", "OPTIONS")
}
