package routes

import (
	"github.com/Rizz-33/blog/go-backend/controllers"
	"github.com/gorilla/mux"
)

func AuthRoutes(router *mux.Router) {
	router.HandleFunc("/signup", controllers.SignUp).Methods("POST", "OPTIONS")
	router.HandleFunc("/signin", controllers.SignIn).Methods("POST", "OPTIONS")
}
