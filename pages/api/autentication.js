const crypto = require('crypto')

export default async function handler(req,res){
  const { key } = req.body
  const hash = crypto.createHash('sha256')
  hash.update(key)
  if (hash.digest('hex') == process.env.NEXT_PUBLIC_LOGIN_KEY) return res.json(1)
  else return res.json(0)
}