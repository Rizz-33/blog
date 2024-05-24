package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
    ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
    Username  string             `json:"username" bson:"username"`
    Email     string             `json:"email" bson:"email"`
    Password  string             `json:"password" bson:"password"`
    Timestamp time.Time          `json:"timestamp,omitempty" bson:"timestamp,omitempty"`
}
