package controllers

import (
	"net/http"

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
	w.Write([]byte("User data retrieved"))
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
