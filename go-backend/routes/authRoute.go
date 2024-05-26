package routes

import (
	"net/http"

	"github.com/Rizz-33/blog/go-backend/controllers"
)

func AuthRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/signup", controllers.SignUp)
	mux.HandleFunc("/api/signin", controllers.SignIn)
}
