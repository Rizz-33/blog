package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte("your_secret_key")

func GenerateJWTToken(username string) (string, error) {
	claims := &jwt.StandardClaims{
		ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
		IssuedAt:  time.Now().Unix(),
		Issuer:    "blog",
		Subject:   username,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}
