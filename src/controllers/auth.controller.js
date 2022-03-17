const express = require("express");

const User = require("../models/user.model");

const register=async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).send({message:"Email Already Registered"})
        }
         user = await User.create(req.body)
         return res.status(200).send({user,token})
    } catch (error) {
         return res.status(500).send({ error: error.massage });
    }

}
