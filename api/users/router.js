const app = require('express')
const router = app.Router();


const { loginUser, SignUp, getAllUsers, getUserById, updateUserById, getUserbyEmail, deleteUserById } = require('./controller')

router.post('/signup', SignUp);
router.post('/login', loginUser);
router.get('/allusers', getAllUsers);
router.get('/getuser/:id', getUserById);
router.get('/userbyemail/:email', getUserbyEmail);
router.put('/updateuser/:id', updateUserById);
router.delete('/deleteuser/:id', deleteUserById)



module.exports = router