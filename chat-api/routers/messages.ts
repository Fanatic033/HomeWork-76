import express from 'express';
import {messageMutation} from '../types';
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
  const queryDate = req.query.datetime as string;
  if (queryDate) {
    const date = new Date(queryDate);

    if (isNaN(date.getDate())) {
      return res.status(400).send('Invalid date');
    }
    const messages = await fileDb.getItems();

    const lastMessages = messages.filter((message) => {
      const messageDate = new Date(message.datetime);
      return messageDate > date;
    })
    return res.send(lastMessages)
  } else {
    const messages = await fileDb.getItems();
    res.send(messages.slice(-30))
  }


})


export default messageRouter;