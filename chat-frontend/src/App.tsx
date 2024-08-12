import './App.css'
import {AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {Message, newMessage} from './types.ts';
import Messages from './features/Components/Messages/Messages.tsx';
import SendMessage from './features/Components/Messages/SendMessage.tsx';
import axiosApi from './axiosApi.ts';


const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<Error | null>(null);



  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axiosApi.get('/messages');
      setMessages(response.data.reverse());
    };

    void fetchMessages();

    const interval = setInterval(async () => {
      if (messages.length > 0) {
        const lastMessageDate = messages[messages.length - 1].datetime;
        const response = await axiosApi.get(`/messages?datetime=${lastMessageDate}`);
        if (response.data.length > 0) {
          setMessages((prevMessages) => [...prevMessages, ...response.data]);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [messages]);

  const sendNewMessage = async (newMessage: newMessage) => {
    try {
      const response = await axiosApi.post('/messages', newMessage);
      setMessages((prevMessages) => [...prevMessages, response.data]);
    } catch (error) {
      setError(error as AxiosError);
    }
  };

  if (error) {
    return <div>{error.message}</div>;
  } else
    return (
      <>
        <div style={{flexBasis: 900}}>
          {messages.map(message => (
            <Messages post={message} key={message.id}/>
          ))}
        </div>
        <div className="ms-5">
          <SendMessage onSendMessage={sendNewMessage}/>
        </div>
      </>
    )
}

export default App