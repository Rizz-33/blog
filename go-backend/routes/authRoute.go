package routes

import (
	"net/http"

	"github.com/Rizz-33/blog/go-backend/controllers"
)

func AuthRoutes() {
	http.HandleFunc("/api/signup", controllers.SignUp)
	http.HandleFunc("/api/signin", controllers.SignIn)
}
