import express from 'express';
import Product from '../models/productmodel.js';
import data from '../data.js';
import User from '../models/usermodel.js';

const seedRouter = express.Router();
seedRouter.get('/', async (req, res) => {
  await Product.remove({});
  const CreatedProducts = await Product.insertMany(data.products);
  await User.remove({});
  const CreatedUsers = await User.insertMany(data.users);
  res.send({ CreatedProducts, CreatedUsers });
});
export default seedRouter;
