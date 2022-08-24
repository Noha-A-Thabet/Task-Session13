const test = async (req, res) => {
     try {
          const userData = new userModel(req.body)
          await userData.save()
          res.send({ apiStatus: true, message: "user registered", data: userData })
     }
     catch (e) {
          res.send({ apiStatus: false, message: e.message, data: e })
     }
}

module.exports = { test }