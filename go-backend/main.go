package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/Rizz-33/blog/go-backend/controllers"
	"github.com/Rizz-33/blog/go-backend/routes"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var database *mongo.Database

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	connectionString := os.Getenv("MONGO_CONNECTION_STRING")
	if connectionString == "" {
		log.Fatal("MongoDB connection string not provided")
	}

	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(connectionString))
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Println("Failed to ping database:", err)
	} else {
		log.Println("Connected to database successfully!")
	}

	database = client.Database("test")
	controllers.InitializeDatabase(database)

	mux := http.NewServeMux()
	routes.AuthRoutes(mux)

	log.Println("Starting server on :8000")
	log.Fatal(http.ListenAndServe(":8000", withCORS(mux)))
}
