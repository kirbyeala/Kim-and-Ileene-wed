import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { v2 as cloudinary } from 'cloudinary'
import routes from './routes/index.js'
const app=express(),server=createServer(app)
const origins=(process.env.CLIENT_URL||'http://localhost:5173').split(',')
const io=new Server(server,{cors:{origin:origins}})
app.set('io',io);app.use(helmet({crossOriginResourcePolicy:false}));app.use(cors({origin:origins}));app.use(express.json({limit:'1mb'}));app.use(routes)
app.get('/health',(_,res)=>res.json({status:'ok'}))
app.use((err,req,res,next)=>{console.error(err);res.status(err.code==='LIMIT_FILE_SIZE'?413:500).json({message:err.message||'Something went wrong'})})
cloudinary.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET})
mongoose.connect(process.env.MONGODB_URI).then(()=>server.listen(process.env.PORT||3000,()=>console.log(`Wedding API listening on ${process.env.PORT||3000}`))).catch(e=>{console.error('MongoDB connection failed',e);process.exit(1)})
