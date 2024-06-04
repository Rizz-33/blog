package controllers

import (
	"context"
	"encoding/json"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection *mongo.Collection

type User struct {
    ID       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
    Username string             `bson:"username" json:"username"`
    Email    string             `bson:"email" json:"email"`
    Password string             `bson:"password" json:"password"`
}

func GetUser(w http.ResponseWriter, r *http.Request) {
    username := r.URL.Query().Get("username")
    if username == "" {
        http.Error(w, "Username is required", http.StatusBadRequest)
        return
    }

    var user User
    err := userCollection.FindOne(context.Background(), bson.M{"username": username}).Decode(&user)
    if err != nil {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }

    json.NewEncoder(w).Encode(user)
}


func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User created"))
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User updated"))
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User deleted"))
}
