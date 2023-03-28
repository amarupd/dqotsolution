const cn = require('../controller/signup')

const router = require('express').Router()


router.post("/login", cn.adduser)

router.get("/user", cn.login)


module.exports = router;