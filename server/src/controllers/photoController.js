import { v2 as cloudinary } from 'cloudinary'
import Photo from '../models/Photo.js'

const uploadBuffer=buffer=>new Promise((resolve,reject)=>cloudinary.uploader.upload_stream({folder:'kim-ileene-wedding',resource_type:'image',transformation:[{quality:'auto',fetch_format:'auto'}]},(e,r)=>e?reject(e):resolve(r)).end(buffer))
export async function uploadPhotos(req,res,next){try{const saved=[];for(const file of req.files){const asset=await uploadBuffer(file.buffer);saved.push(await Photo.create({imageUrl:asset.secure_url,publicId:asset.public_id,guestName:req.body.guestName,message:req.body.message}))}saved.forEach(p=>req.app.get('io').emit('photo:new',p));res.status(201).json({photos:saved})}catch(e){next(e)}}
export async function listPhotos(req,res,next){try{const page=Math.max(1,+req.query.page||1),limit=Math.min(60,+req.query.limit||40);const photos=await Photo.find({approved:true}).sort({createdAt:-1}).skip((page-1)*limit).limit(limit);res.json({photos,page,hasMore:photos.length===limit})}catch(e){next(e)}}
export async function latest(req,res,next){try{res.json(await Photo.find({approved:true,createdAt:{$gt:new Date(req.query.since||0)}}).sort({createdAt:-1}).limit(100))}catch(e){next(e)}}
export async function removePhoto(req,res,next){try{const p=await Photo.findByIdAndDelete(req.params.id);if(!p)return res.sendStatus(404);await cloudinary.uploader.destroy(p.publicId);req.app.get('io').emit('photo:deleted',p.id);res.sendStatus(204)}catch(e){next(e)}}
export async function stats(req,res,next){try{const start=new Date();start.setHours(0,0,0,0);res.json({total:await Photo.countDocuments(),today:await Photo.countDocuments({createdAt:{$gte:start}})})}catch(e){next(e)}}
