import express from 'express';
import user from '../controllers/user.js';

const router = express.Router();

router
  .get('/', user.onGetAllUsers)
  .post('/', user.createUser)
  .put("/:id",user.editUser)
  .get('/:id', user.onGetUserById)
  .delete('/:id', user.onDeleteUserById)

export default router;