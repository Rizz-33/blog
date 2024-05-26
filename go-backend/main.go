package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/Rizz-33/blog/go-backend/controllers"
	"github.com/Rizz-33/blog/go-backend/routes"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client   *mongo.Client
	database *mongo.Database
)

type Response struct {
	Message string `json:"message"`
}

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

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var result Response
	err := database.Collection("messages").FindOne(context.Background(), bson.M{}).Decode(&result)
	if err != nil {
		log.Println("Error fetching data from MongoDB:", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	if result.Message == "" {
		http.Error(w, "No data found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(result)
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

	client, err = mongo.Connect(context.Background(), options.Client().ApplyURI(connectionString))
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

	routes.AuthRoutes()

	http.HandleFunc("/api/message", handler)
	log.Println("Starting server on :8000")
	log.Fatal(http.ListenAndServe(":8000", withCORS(http.DefaultServeMux)))
}
