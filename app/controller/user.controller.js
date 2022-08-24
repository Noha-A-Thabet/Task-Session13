const userModel = require("../database/model/user.model")
class User {

     //  all^^^^^^^^^^^^^^^^^^^^^^^^
     static index = async (req, res) => {
          try {
               const data = await userModel.find()
               res.send({ apiStatus: true, message: "all users fetched", data })
          }
          catch (e) {
               res.send({ apiStatus: false, message: e.message, data: e })
          }
     }

     //  create^^^^^^^^^^^^^^^^^^^^^^^^
     static create = async (req, res) => {
          try {
               const userData = new userModel(req.body)
               await userData.save()
               res.send({ apiStatus: true, message: "user registered", data: userData })
          }
          catch (e) {
               res.send({ apiStatus: false, message: e.message, data: e })
          }
     }

     //  login^^^^^^^^^^^^^^^^^^^^^^^^
     static login = async (req, res) => {
          try {
               const userData = await userModel.login(req.body.email, req.body.password)
               const token = await userData.generateToken()
               res.send({
                    apiStatus: true,
                    message: "logged in",
                    data: { userData, token }
               })
          }
          catch (e) {
               res.send({ apiStatus: false, message: e.message, data: e })
          }
     }


     //  single^^^^^^^^^^^^^^^^^^^^^^^^
     static single = async (req, res) => {
          try {
               const data = await userModel.findById(req.params.id)
               res.send({ apiStatus: true, message: "all users fetched", data })
          }
          catch (e) {
               res.send({ apiStatus: false, message: e.message, data: e })
          }

     }
     //  edit^^^^^^^^^^^^^^^^^^^^^^^^
     static edit = async (req, res) => {
          try {
               const data = await userModel.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { runValidators: true }
               )
               console.log(data);
               res.send({ apiStatus: true, message: "all users fetched", data })
          }
          catch (e) {
               res.send({ apiStatus: false, message: e.message, data: e })
          }

     }
     
     // Delete %%%%%%%%%%%%%%%%%%
     static delete = async(req, res)=>{
          try{
              const data = await userModel.findByIdAndDelete(req.params.id)
              res.send({ apiStatus:true, message:"all users fetched", data }) 
          }
          catch(e){
              res.send({ apiStatus: false, message:e.message, data:e })
          }
  
      }
     }

module.exports = User