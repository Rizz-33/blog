package main

import (
	"encoding/json"
	"log"
	"net/http"
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

    response := Response{Message: "Hello from Go!"}
    json.NewEncoder(w).Encode(response)
}

func main() {
    http.HandleFunc("/api/message", handler)
    log.Println("Starting server on :8000")
    log.Fatal(http.ListenAndServe(":8000", nil))
}
