

import User from '../models/User.js';

import makeValidation from '@withvoid/make-validation';

export default {
   
  createUser : (req, res) => {
    const body=req.body
   // console.log(req.body);

   const validation = makeValidation(types => ({
    payload: req.body,
    checks:{
      firstName: { type: types.string },
          lastName: { type: types.string },
          phone:{type:types.string}
    }
  
  }))


    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }
    if(validation.success){
    const user = new User(req.body)
    console.log(user)
    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
        //   console.log(user)
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
               firstName:user.firstName,
               lastName:user.lastName,
               email:user.email,
               phone:user.phone,
               password:user.password 
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}
else{
  return res.status(400).json({
   error: validation.errors,
   message:validation.message
  })
}

}
,
   onGetAllUsers: async (req, res) => {
    await User.find({}, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!user.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
},

editUser: async (req, res) => {
  const body = req.body
  console.log("controller edit",body)
  if (!body) {
      return res.status(400).json({
          success: false,
          error: 'You must provide a body to update',
      })
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'User not found!',
          })
      }
      user.firstName = body.firstName
      user.lastName=body.lastName
      user.phone=body.phone
      user.password=body.password
      user
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: user._id,
                  message: 'User updated!',
                  firstName:user.firstName,
                  lastName:user.lastName,
                  phone:user.phone,
                  password:user.password
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'User not updated!',
              })
          })
  })
},
onGetUserById:async (req, res) => {
await User.findOne({ _id: req.params.id }, (err, user) => {
  if (err) {
      return res.status(400).json({ success: false, error: err })
  }

  if (!user) {
      return res
          .status(404)
          .json({ success: false, error: `User not found` })
  }
  return res.status(200).json({ success: true, data: user})
}).catch(err => console.log(err))

}
,
onDeleteUserById:async (req, res) => {
  console.log(req.params.id)
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!user) {
          return res
              .status(404)
              .json({ success: false, error: `User not found` })
      }

      return res.status(200).json({ success: true, data: user })
  }).catch(err => console.log(err))

}



}

  