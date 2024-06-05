package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Username  string             `bson:"username" json:"username"`
	Email     string             `bson:"email" json:"email"`
	Password  string             `bson:"password" json:"password"`
	Timestamp time.Time          `bson:"timestamp" json:"timestamp"`
}

var userCollection *mongo.Collection

func InitializeUserController(db *mongo.Database) {
    userCollection = db.Collection("users")
}

func GetUser(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, err := primitive.ObjectIDFromHex(params["id"])
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    var user User
    err = userCollection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&user)
    if err != nil {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }

    json.NewEncoder(w).Encode(user)
}


func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	if user.Username == "" || user.Email == "" || user.Password == "" {
		http.Error(w, "Username, email, and password are required", http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}
	user.Password = string(hashedPassword)
	user.Timestamp = time.Now()

	_, err = userCollection.InsertOne(context.Background(), user)
	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
    var user User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }
    defer r.Body.Close()

    if user.ID == primitive.NilObjectID {
        http.Error(w, "User ID is required", http.StatusBadRequest)
        return
    }

    updateFields := bson.M{
        "username": user.Username,
        "email":    user.Email,
        "timestamp": time.Now(),
    }

    if user.Password != "" {
        hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
        if err != nil {
            http.Error(w, "Failed to hash password", http.StatusInternalServerError)
            return
        }
        updateFields["password"] = string(hashedPassword)
    }

    update := bson.M{"$set": updateFields}

    _, err := userCollection.UpdateByID(context.Background(), user.ID, update)
    if err != nil {
        http.Error(w, "Failed to update user", http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(map[string]string{"message": "User updated successfully"})
}


func DeleteUser(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")
	if username == "" {
		http.Error(w, "Username is required", http.StatusBadRequest)
		return
	}

	_, err := userCollection.DeleteOne(context.Background(), bson.M{"username": username})
	if err != nil {
		http.Error(w, "Failed to delete user", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "User deleted successfully"})
}
