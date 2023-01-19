import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"

mongoose.connect("mongodb://localhost:27017/comment")

const commentSchema = new mongoose.Schema({
    text : String
})

const Comment = mongoose.model("comments",commentSchema)


const app = express()
app.use(cors())
let jsonParser = bodyParser.json()



app.get("/",async (req,res) =>{
    let comments = await Comment.find()
    res.send(comments)
})

app.delete("/:id",async (req,res)=>{
    await Comment.deleteOne({_id : req.params.id})
    res.send("status code 202 ok")
})

app.post("/", jsonParser ,async (req,res)=>{
    await new Comment({text: req.body.text}).save()
    res.send("ok")
})

app.listen(4000)
