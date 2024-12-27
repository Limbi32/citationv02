"use client"
import React from 'react'

export default function login() {
  return (
    <div>

        <h1>Connexion/Inscription</h1>

        
        <label htmlFor="login">Login</label><input type="text" name="login" id="login" />
        <label htmlFor="mdp">Password </label><input type="text" name='mdp' id='mdp' />
    </div>
  )
}

