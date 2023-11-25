const express =require('express')

const router = express.Router()
const getphotoHandler = require('../router_handler/photo')

router.get('/getAllphoto',getphotoHandler.getPhoto)

router.post('/addPhoto',getphotoHandler.uploadPhoto)

router.post('/deletePhoto',getphotoHandler.delPhoto)

module.exports=router