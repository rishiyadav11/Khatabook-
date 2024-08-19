const express = require("express");
const authProtect = require("../middlewares/authprotect");
const validateHissabData = require("../middlewares/hisaab-validate");
const {createhissab,allHissab,sharehisaab,deleteHissab,editHissab,decryptHissab,findHissab} = require("../controllers/hisaabcontroller")
const router = express.Router();

router.post("/create",authProtect,validateHissabData,createhissab);

router.get("/posts", authProtect,allHissab);


router.delete('/delete/:id', authProtect,deleteHissab); 

router.get('/post/:id',authProtect,findHissab)
router.post('/post/:id',authProtect,findHissab)

router.get('/shared/:id', sharehisaab);
  

router.post('/edit/:id', authProtect,validateHissabData,editHissab );


module.exports = router;
