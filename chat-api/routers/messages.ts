import express from 'express';
import {IMessage, messageMutation} from '../types';
import fileDb from '../fileDb';

const messageRouter = express.Router();

messageRouter.post('/', async (req, res) => {
  if (!req.body.message || !req.body.author) {
    return res.status(400).send('Invalid message');
  }
  const message: messageMutation = {
    author: req.body.author,
    message: req.body.message,
  }
  const savedMessage = await fileDb.addItem(message)
  return res.send(savedMessage)
})

messageRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();
  res.send(messages.slice(-30))
})

export default messageRouter;