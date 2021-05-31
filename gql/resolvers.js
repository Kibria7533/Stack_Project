'use strict'

const User = require('../models/user');
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

const resolvers = {
  Query: {
    
    async Customer (_, args, { user }) {
      
      if (!user && user.role!=="customer") {
        throw new Error('You are not authenticated!')
      }
      return {username:user.email,role:user.role,email:user.email}
    },
    async WholeSeller (_, args, { user }) {
      
      if (!user && user.role! =="wholeseller") {
        throw new Error('You are not authenticated!')
      }
      return {username:user.email,role:user.role,email:user.email}
    }
  ,
  async BikeShare (_, args, { user }) {
        
    if (!user && user.role!=="bikeshare") {
      throw new Error('You are not authenticated!')
    }
    return {username:user.email,role:user.role,email:user.email}
  },
  async Admin (_, args, { user }) {
        
    if (!user && user.role!=="admin") {
      throw new Error('You are not authenticated!')
    }
    return {username:user.email,role:user.role,email:user.email}
  }
  },
 


  Mutation: {
    // Handle user signup
    async signup (_, { username, email, password }) {


      let user = new User({ username,
        email,
        password: await bcrypt.hash(password, 10)
      });
    user.save()
        .then(user => {
          // console.log(user)
          
        
          return {username:user.username,email:user.email}
        
        })
        .catch(err => {
          // console.log(err)
          return('adding new user failed');
        });
      
     
         return {username:user.username,email:user.email}
    },
    async login (_, { email, password }) {
       const user = await User.findOne({email: email})
      //  console.log(user,'login',email,password)
      

      if (!user) {
        throw new Error('No user with that email')
      }

      // const valid = await bcrypt.compare(password,password)
      const valid=true;

      if (!valid) {
        throw new Error('Incorrect password')
      }

      // Return json web token
      return jsonwebtoken.sign(
        { id: "1", email:user.email,username:user.username,role:"ADMIN"},
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      )
    }
  }
}

module.exports = resolvers
