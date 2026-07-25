const bcrypt = require("bcrypt")
const pool = require("../config/db")
const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.login = async (req,res) =>{
    const {email,password} = req.body;
     if (!email || !password) {
        return res.status(400).json({
            message: "Please enter email and password"
        });
    }
    try{
        const result = await pool.query("select * from users where email =$1",[email]);
        if(result.rows.length === 0)
        {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            //401- unauthorized
            return res.status(401).json({
                message:"invalid password"
            })
        }
        //hum kabhi bhi user ko password nhi bhejenge
        delete user.password;

          const token = jwt.sign(
            {
                id:user.id,
                email:user.email
            },
            //secret - it helps to digitally sign this token
            // and later we will verify it using this key
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRES_IN
            }
          );
    
          res.cookie("token", token, {
             httpOnly: true,
             secure: false,
             sameSite: "lax",
            maxAge: 1000 * 60 * 60
           });

        return res.status(200).json({
    success: true,
    message: "Login successful"
});
    }
    catch(err)
    {
        console.log(err);
          res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


exports.register = async (req,res) =>{
    let {name,email,password,age,phone_no} = req.body;

  

    if(!name || !email || !password || !age || !phone_no)
    {
        return res.status(400).json({err:'please fill all details'})
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Invalid email"
    });
}

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if (!passwordRegex.test(password)) {
    return res.status(400).json({
        message:
        "Password must contain uppercase, lowercase, number and special character."
    });
}

const phoneRegex = /^[0-9]{10}$/;

if (!phoneRegex.test(phone_no)) {
    return res.status(400).json({
        message: "Invalid phone number"
    });
}

if (age < 18 || age > 100) {
    return res.status(400).json({
        message: "Invalid age"
    });
}

    try{
       const insertQuery = `insert into users (name,email,password,age,phone_no) values ($1,$2,$3,$4,$5) returning *`;
   
       const validation = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
);

if (validation.rows.length > 0) {
    return res.status(409).json({
        message: "Email already exists"
    });
}
const hashedPassword = await bcrypt.hash(password, 10);
password=hashedPassword;
       const result = await pool.query(insertQuery,[name,email,password,age,phone_no])
    
       res.status(201).json(result.rows[0]);
    }
     catch(err)
    {
       console.log(err);
      res.status(500).json({error: 'internal server error'})
    }
}

exports.logout = (req, res) => {

    res.clearCookie("token");

    return res.status(200).json({
        success: true,
        message: "Logout successful"
    });

};

exports.me = (req,res) =>{
    return res.status(200).json({
        authenticated: true,
        user: req.user
    });

}