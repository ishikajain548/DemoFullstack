const pool = require('../config/db')
const bcrypt = require("bcrypt");

exports.getAllUsers =  async (req,res)=>{
    try{
       const response = await pool.query('select * from users')
       res.status(200).json(response.rows)
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({error: 'internal server error'})
    }
}
exports.getUserById = async (req,res) =>{
    try{
        const {id} = req.params;
        const result = await pool.query('select * from users where id = $1',[id])
        if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
        res.status(200).json(result.rows[0])
    }
    catch(err)
    {
       console.log(err);
      res.status(500).json({error: 'internal server error'})
    }
}


exports.updateUserPutRequest = async (req,res) =>{
    
       const {id} = req.params;
       const {name,email,password,age,phone_no} = req.body;

       if(!name || !email || !password || !age || !phone_no)
        {
        return res.status(400).json({err:'These fields cannot be empty'})
        }
    try{

        const updateQuery = `update users set name = $1 , email =$2, password=$3 , age =$4, phone_no=$5 where id=$6`;
   
       const result = await pool.query(updateQuery,[name,email,password,age,phone_no,id])
    
       res.status(200).json({ message : 'row updated success.'});

    }
    catch(err)
    {
        console.log(err);
         res.status(500).json({error: 'internal server error'})
    }
}

exports.updateUserPatchRequest = async (req,res) =>{
    try{
        const {id} = req.params;
       const {name,email,password,age,phone_no} = req.body;
        
       const oldUser = await pool.query('select * from users where id = $1',[id])
       if(oldUser.rows.length===0)
       {
         return res.status(404).json({ message: 'User not found' });
       }
       const updatedName = name || oldUser.rows[0].name;
       const updatedEmail = email || oldUser.rows[0].email;
       const updatedpassword = password || oldUser.rows[0].password;
       const updatedage = age || oldUser.rows[0].age;
       const updatedPhoneNo = phone_no || oldUser.rows[0].phone_no;

       await pool.query(
        `update users set name=$1, email=$2, password=$3, age=$4, phone_no=$5 where id=$6`,
        [updatedName,updatedEmail,updatedpassword,updatedage,updatedPhoneNo,id]
       )
        res.status(200).json({ message : 'row updated success.'});
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({error: 'internal server error'})
    }
}
exports.deleteUser = async (req,res) =>{
    try{
        const {id} = req.params;
         const result = await pool.query('delete from users where id = $1',[id]) 
         res.status(204).json({message: 'row deleted successfully!'})
        }
    catch(err)
    {
      console.log(err);
      res.status(500).json({error: 'internal server error'})

    }
}