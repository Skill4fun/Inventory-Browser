/* eslint-disable no-console */
import mongoose from 'mongoose';
import connectToDatabase from './connection';
import platinetExpProducts from './platinetExpProducts.json';
import { productService } from '../services/productService';

export async function loadData() {
  await connectToDatabase();
  console.log('Start dataLoader process!');
  const updatedProducts = [];
  const newlyAddedProducts = [];

  for (let i = 0; i < platinetExpProducts.length; i += 1) {
    try {
      /* eslint-disable no-await-in-loop */
      const result = await productService.updateProduct(platinetExpProducts[i]);
      if (result) {
        updatedProducts.push(result);
      }
    } catch (error) {
      const result = await productService.addNewProduct(platinetExpProducts[i]);
      if (result) {
        newlyAddedProducts.push(result);
      }
    }
    /* eslint-enable no-await-in-loop */
    console.log(`[${(Math.round((i / platinetExpProducts.length) * 100)) % 2 === 0 ? 'PROCESS' : 'PENDING'} ${'0'.repeat(3 - (Math.round((i / platinetExpProducts.length) * 100)).toString().length)}${Math.round((i / platinetExpProducts.length) * 100)}%] ${' '.repeat(3 - (i % 4))}${'.'.repeat((i % 4))}${'.'.repeat(i % 4)}${' '.repeat(3 - (i % 4))} [Checked ${'0'.repeat(4 - i.toString().length)}${i}/${platinetExpProducts.length}] - [Updated ${updatedProducts.length}] - [New added ${newlyAddedProducts.length}]`);
  }

  console.log('DATALOADER PROCESS ENDED!');
  console.log(`- Updated Products: ${updatedProducts.length}, list: ${updatedProducts.length > 0 ? updatedProducts : 'no product'}`);
  console.log(`- New Products added: ${newlyAddedProducts.length}, list: ${newlyAddedProducts.length > 0 ? newlyAddedProducts : 'no product'}`);

  let collections = await mongoose.connection.db.listCollections().toArray();
  collections = collections ?? [];
  console.log('Current collections in database: ', collections);
}

loadData();
