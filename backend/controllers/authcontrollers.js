const UserModel = require("../models/user-model")
const generateToken = require("../utils/generate-token")
const bcrypt = require("bcrypt")


// const registerUser = async (req,res)=>{
//     const { name, email, password } = req.body;
//     try {
//         let user = await UserModel.findOne({ email: email});
//         if (user) {
//             return res.json({ msg: "User already registered" ,
//                 already:true
//             });
//         }
//         let salt = await bcrypt.genSalt(10);
//         let hash = await bcrypt.hash(password, salt);
//         const newUser = await UserModel.create({
//             name: name,
//             email: email,
//             password: hash,
//         }); 

//         let token = generateToken({ email });

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: true,
//             maxAge: 30 * 24 * 60 * 60 * 1000,
//         });

//         return res.status(201).json({msg:"user created successfully",
//             already:false
//         }); // Ensure you return after sending response

//     } catch (error) {
//         return res.status(500).send("Something went wrong!"); // Ensure you return after sending response
        
//     }
// }



const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await UserModel.findOne({ email: email });
        if (user) {
            return res.json({ 
                msg: "User already registered",
                already: true 
            });
        }
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          };
          const bgcolor = getRandomColor()
        const newUser = await UserModel.create({
            name: name,
            email: email,
            password: hash,
            bgcolor:bgcolor
        });

        let token = generateToken({ email });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use 'true' in production
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        });

        return res.status(201).json({ 
            msg: "User created successfully",
            already: false 
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send("Something went wrong!");
    }
};


const loginUser =async(req,res)=>{
    const { email, password } = req.body;
    try {
        let user = await UserModel.findOne({email})
        if (!user) {
            return res.status(500).json({msg:"Email or password incorrect", 
                already: false 
            })
        }
        let result = await bcrypt.compare(password,user.password)
        if(result){
          let token = generateToken({ email });
    
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
    
            return res.status(201).json({msg:"logged in successfully",
                already: true 
            }); // Ensure you return after sending response
        }
        else{
            return res.status(500).json({msg:"Email or password incorrect"})
        }
    } catch (error) {
        return res.status(500).send("Something went wrong!"+error); // Ensure you return after sending response
        
    }
}

const logoutUser =(req,res)=>{
    try {
        res.clearCookie('token'); // Clear the authentication token cookie
        res.json({msg:"Logout successfully"})
    } catch (error) {
        res.json({msg:"error in loging out",
            error:error
        })
    }
}

const getUserprofile = async (req, res) => {
    try {
        const data = await UserModel.findOne({ email: req.user.email }).populate('hissabs');
        res.json({
            msg: "You are logged in",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error in fetching profile",
            error: error.message
        });
    }
};


module.exports = {
    loginUser,registerUser,getUserprofile,logoutUser
}