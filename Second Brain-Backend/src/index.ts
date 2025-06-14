import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { contentModel, LinkModel, userModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middlewares";
import cors from 'cors';    

import { random } from "./utils";

// const JWT_PASSWORD = "!12345"
const app = express();

app.use(express.json());
app.use(cors());


app.post("/api/v1/signup",async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
    await userModel.create({
        username : username,
        password : password
    });
    res.json({
        message : "signup Completed"
    });
    }
    catch(e){
        res.status(411).json({
            message : "User already exists"
        })
    }

})

app.post("/api/v1/signin",async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await userModel.findOne({
        username,
        password

    })
    if(existingUser){
        const token = jwt.sign({
            id : existingUser._id}, JWT_PASSWORD)
        
        res.json({token})
    
    }
    else{
        res.status(403).json({
            message : "Incorrect Credentials"
        })
    }
    
    
})

app.post("/api/v1/content",userMiddleware, async (req,res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    // try{
    await contentModel.create({
        title,
        link,
        tags : [],
        type,
       //@ts-ignore
        userId : req.userId
    });
    res.json({
        message : "Content Added" 
    });
// }catch(e){
//     res.status(500).json({
//         message : "Error"
//     })
// }
    
})

app.get("/api/v1/content", userMiddleware ,async (req,res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId : userId
    }).populate("userId","username" )
    res.json({
        content
    })
    // console.log(content)
    
})

// app.put("/api/v1/content",(req,res) => {
    
// })

app.delete("/api/v1/content",userMiddleware, async (req,res) => {
    const contentId = req.body.contentId;
    await contentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId : req.userId

    })
    res.json({
        message : "Deleted"
    })
    
    
})

app.post("/api/v1/brain/share",userMiddleware,async (req,res) => {
    const share = req.body.share;

    if(share){
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId : req.userId
        });
        if(existingLink){
            res.json({
                hash : existingLink.hash
            })

            return ;
        }
        const hash = random(10)
        await LinkModel.create({
            // @ts-ignore
            userId : req.userId,
            hash: hash

        })

        res.json({
            hash
        })
    }
    else{
        await LinkModel.deleteOne({
            // @ts-ignore
            userId : req.userId
        });

        res.json({
            message : "Removed Link"
        })
    }

    

    
})

app.get("/api/v1/brain/:shareLink",async (req,res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    })

    if(!link){
        res.status(411).json({
            message :"Sorry incorrect input"
        })
        return ;
    }
    const content = await contentModel.find({
        userId : link.userId
    })
    
    const user = await userModel.findOne({
        _id : link.userId
    })

    if(!user){
        res.status(411).json({
            message : "user not found, error should ideally not happen"
        })
        return ;
    }

    res.json({
        username : user.username,
        content : content
    })
})

app.listen(3000);