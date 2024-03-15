const jwt = require ('jsonwebtoken')
const auth = (req,res,next)=>{
    const token = req.headers['authorization']
    const recive =token && token.split('')[1]
    const jwtverify =jwt.varify(recive.process.env.ACCESS_USERTOKEN_SECRET)
  if (jwtverify){
    res.token=jwtverify.id
    next()
  }else{
    res.json('permision decline')
  }
}
