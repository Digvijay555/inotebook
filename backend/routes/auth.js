const express = require('express')
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
var fetchuser = require('../middlewear/fetchuser')


const jwt_Secret = 'DigvijaySingh';


// post request to send data into database
// post request is good for use because it is secure
// Route 1
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {

    // If there are errors return bad request or the errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {

        // check whether the user with same email is exist already
        let user = await User.findOne({ email: req.body.email })

        // if user is already exist then return some message
        if (user) {
            return res.status(400).json({ error: "user is already exist" })
        }

        //use salt to protect our password
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const jwtData = jwt.sign(data, jwt_Secret);
        console.log(jwtData);

        res.json({ "nice": "nice" })
    }
    catch (error) {
        console.error(error.message);
    }

})

// Route 2: Authenticate user using:Post 
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password can not be blank").exists(),
], async (req, res) => {

    // If there are errors return bad request or the errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const{email,password} = req.body;
    try{
            let user = await User.findOne({email});
            if(!user)
            {
                return res.status(400).json({error:"Please try to login with right credentials"});
            }

            const passwordCompare = await bcrypt.compare(password,user.password);
            if(!passwordCompare)
            {
                return res.status(400).json({error:"Please try to login with right credentials"})
            }

            const data = {
                user: {
                    id: user.id
                }
            }
    
            const authToken = jwt.sign(data, jwt_Secret);
            res.json(authToken);
    }
    catch(error){
        console.error(error.message);
    }
})

// Router 3: to fetch user data
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userid = req.user.id;
        const user = await User.findById(userid).select("-password")
        res.send(user)
        
    } catch (error) {
        console.error(error.message);
    }
})
    module.exports = router