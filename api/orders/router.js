const app = require('express')
const router = app.Router()
const { demoMail, addOrders, orderbyId, allorders, SendEmail } = require('./controller')

router.post('/send-demo-mail', demoMail)
router.post('/create-order', addOrders)
router.get('/all-orders', allorders)
router.get('/order-by-id/:_id', orderbyId)
router.post('/sendEmail', SendEmail);


module.exports = router