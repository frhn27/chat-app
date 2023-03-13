const User =require("../../models/userModel.js");
const asyncHandler=require("express-async-handler");
const generateToken = require("../../config/generateToken.js");

//methode GET /api/users?=farhan
//all users 
const allUser=asyncHandler(async (req , res)=>{
  try {
     const keyword=req.query.search
    ?{
      $or:[
        {name:{$regex:req.query.search,$options:"i"} },
        {email:{$regex:req.query.search,$options:"i"}},
      ],
    }
    :{};

     const user = await User.find(keyword).find({_id:{$ne:req.user.id}});
     res.send(user);
      
    } catch (error) {
      res.status(404).json({
        message:error.message
      });
   };
});



//methode POST /api/users
//register new user
const register=asyncHandler(async(req, res)=>{
  try {
    //payload
    const {name,email,password,pic} = req.body;

    //validasi kolom harus terisi
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('kolom harus terisi')
    };

    //jika sudah ada email yg sudah digunakan
    const userExist= await User.findOne({ email });

    if(userExist){
      res.status(200);
      throw new Error('email sudah di gunakan  sudah ada terpakai')
    }

    // membuat user baru
    const user = await User.create({name, email, password, pic});
    if (user) {
      res.status(200).json({
        message: "Registrasi akun berhasil"
      })
    };

    //check user
    if(user){
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      //  pic:user.pic,//
        token:generateToken(user._id),
      });
    } else{
      res.status(404).json({message: "user tidak ditemukan"})
    };
    
  } catch (error) {
    res.status(404).json({
      message:error.message
    })
  };
});


//Methode POST /api/users/login
//login /api
const login =asyncHandler(async(req, res)=>{
  //payload
  const {email,password}=req.body;
  
  const user = await User.findOne({email})

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token:generateToken(user._id)
    })
  }

})


module.exports={allUser, register, login}