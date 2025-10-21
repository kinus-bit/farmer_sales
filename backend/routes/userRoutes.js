const express = require('express');
const { createUser, getUser, updateUser, deleteUser, loggingUser, getOneUser } = require('../controllers/userController');
const { Protect , admin} = require('../middlewares/authMiddleware');

//fire up the router
const router = express.Router();

//getting all users
router.get('/getAll',Protect,admin,getUser);

//getting one user
router.get('/getOne',Protect,getOneUser);

//logging user 
router.post('/login',loggingUser);

//creating a user
router.post('/signup',createUser);

//updating a user
router.put('/update/:id',Protect,admin,updateUser);

//deleting a user
router.delete('/delete/:id',Protect,admin,deleteUser);


module.exports = router;