/* eslint-disable no-console */
import mongoose from 'mongoose';
import connectToDatabase from './connection';
import { articleService } from '../services/articleService';
import ApiError from '../error/ApiError';

export async function loadArticleData() {
  await connectToDatabase();
  console.log('Start articleLoader process!');

  try {
    const { articles } = await articleService.addArticle('VARR', 100);
    if (articles) {
      console.log('DATALOADER PROCESS ENDED!');
      console.log(`- New Articles added: ${articles.length}, list: ${articles.length > 0 ? articles : 'no articles'}`);
    }
    let collections = await mongoose.connection.db.listCollections().toArray();
    collections = collections ?? [];
    console.log('Current collections in database: ', collections);
  } catch (error) {
    throw new ApiError(500, `Articleloader failed: ${error.message}`);
  }
}

loadArticleData();
