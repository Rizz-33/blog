package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/Rizz-33/blog/go-backend/routes"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Response struct {
	Message string `json:"message"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

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

	collection := client.Database("test").Collection("messages")

	_, err = collection.InsertOne(context.Background(), bson.D{{"message", "Hello from MongoDB!"}})
	if err != nil {
		log.Fatal(err)
	}

	var result Response
	err = collection.FindOne(context.Background(), bson.M{}).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(result)
}

func main() {
	routes.UserRoutes()

	http.HandleFunc("/api/message", handler)
	log.Println("Starting server on :8000")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
