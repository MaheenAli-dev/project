const { connect } = require('mongoose')
require('dotenv').config()
const { User } = require('./model')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')



const loginUser = async (req, res) => {
    const { password, email } = req.body;


    try {
        await connect(process.env.MONGODB_URL);
        const checkExisting = await User.findOne({ email: email })

        if (!checkExisting) {
            res.json({
                message: "User Not Found"
            })

        }
        else {
            console.log(checkExisting)

            const decryptpassword = await compare(password, checkExisting.password)

            console.log(decryptpassword)

            if (email == checkExisting.email && decryptpassword) {


                const token = sign(
                    {
                        username: checkExisting.username,
                        email: checkExisting.email,
                        id: checkExisting._id,
                        profile_picture : checkExisting.profile_Pic,
                        role : checkExisting.role
                    }
                    , process.env.JWT_SECRET)



                res.json({
                    message: "hi",
                    token: token
                })

            }
            else {
                res.json({
                    message: "invalid"
                })
            }

        }

    } catch (error) {

        res.json({
            message: error.message
        })

    }
}

const SignUp = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        await connect(process.env.MONGODB_URL);
        const checkExisting = await User.exists({ email: email })

        if (checkExisting) {
            res.json({
                message: "User Already Exists"
            })

        }
        else {
            await User.create({ username, email, password: await hash(password, 12) })

            res.json({
                message: "User created"
            })

        }

    } catch (error) {

        res.json({
            message: error.message
        })

    }

}

const getAllUsers = (req, res) => {
    res.json({
        users: [
            {
                "id": 1,
                "username": "Maheen Ali",
                "email": "alimaheen2004@gmail.com",
                "password": "blahhhh"
            },
            {
                "id": 2,
                "username": "wajeeh ul hasan",
                "email": "wajeehulhasan2003@gmail.com",
                "password": "error222"
            },
            {
                "id": 3,
                "username": "Erum Raza",
                "email": "ErumRaza.@gmail.com",
                "password": "momal"
            },
            {
                "id": 4,
                "username": "Momal Raza",
                "email": "Phulandevi@gmail.com",
                "password": "cutie"
            },
            {
                "id": 5,
                "username": "Ahsan Ali",
                "email": "Ali'shead@gmail.com",
                "password": "Father"
            },
            {
                "id": 6,
                "username": "Mehreen",
                "email": "mehreen@gmail.com",
                "password": "hhhh"
            },
            {
                "id": 7,
                "username": "ilma khan",
                "email": "ilma90@gmail.com",
                "password": "babby66.."
            },
            {
                "id": 8,
                "username": "Ali mahi",
                "email": "mahi@gmail.com",
                "password": "webdev"
            },
            {
                "id": 9,
                "username": "shahmeer",
                "email": "shah@gmail.com",
                "password": "56784"
            },
            {
                "id": 10,
                "username": "jiya",
                "email": "jiya@gmail.com",
                "password": "idiot"
            }

        ]

    })
}

const getUserbyEmail = async (req, res) => {

    const { email } = req.params


    try {
        await connect(process.env.MONGODB_URL)
        const Users = await User.findOne({ email: email })
        res.json(
            {
                Users: Users
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}

const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        await connect(process.env.MONGODB_URL);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User found successfully.',
            user: user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const { username, profile_Pic } = req.body;

    try {
        await connect(process.env.MONGODB_URL);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, profile_Pic },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User updated successfully.',
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const deleteUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        await connect(process.env.MONGODB_URL);
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User deleted successfully.',
            user: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { loginUser, SignUp, getAllUsers, getUserbyEmail, getUserById, updateUserById, deleteUserById }