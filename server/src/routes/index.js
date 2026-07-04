import { Router } from 'express'
import multer from 'multer'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import { listPhotos,latest,removePhoto,stats,uploadPhotos } from '../controllers/photoController.js'
import { createGreeting,listGreetings,removeGreeting } from '../controllers/greetingController.js'
import { requireAdmin } from '../middleware/auth.js'
const router=Router()
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:10*1024*1024,files:20},fileFilter:(_,f,cb)=>cb(null,['image/jpeg','image/png','image/webp'].includes(f.mimetype))})
router.post('/upload',rateLimit({windowMs:60000,limit:30}),upload.array('photos',20),uploadPhotos)
router.get('/photos',listPhotos);router.get('/latest',latest);router.get('/stats',stats)
router.get('/greetings',listGreetings);router.post('/greetings',rateLimit({windowMs:60000,limit:10}),createGreeting)
router.delete('/photo/:id',requireAdmin,removePhoto)
router.delete('/greeting/:id',requireAdmin,removeGreeting)
router.post('/admin/login',(req,res)=>{if(req.body.username===process.env.ADMIN_USERNAME&&req.body.password===process.env.ADMIN_PASSWORD)return res.json({token:jwt.sign({role:'admin'},process.env.JWT_SECRET,{expiresIn:'8h'})});res.status(401).json({message:'Invalid credentials'})})
export default router
