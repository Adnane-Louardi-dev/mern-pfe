const express=require('express')
const router=express.Router()
router.get("/",(req,res)=>{
    res.json({data:"hello from public route"})
})
module.exports = router;