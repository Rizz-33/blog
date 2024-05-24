package routes

import (
	"net/http"

	"github.com/Rizz-33/blog/go-backend/controllers"
)

func UserRoutes() {
	http.HandleFunc("/api/user", controllers.GetUser)
	http.HandleFunc("/api/user/create", controllers.CreateUser)
	http.HandleFunc("/api/user/update", controllers.UpdateUser)
	http.HandleFunc("/api/user/delete", controllers.DeleteUser)
}
