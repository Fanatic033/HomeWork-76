import './App.css'
import {AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {Message, newMessage} from './types.ts';
import Messages from './Components/Messages/Messages.tsx';
import SendMessage from './Components/Messages/SendMessage.tsx';
import axiosApi from './axiosApi.ts';


const App = () => {
    const [posts, setPosts] = useState<Message[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            const result = await axiosApi.get("/messages");
            setPosts(result.data);
        } catch (error) {
          console.error(error);
        }
    };
    useEffect(() => {
        void fetchData();
        const threeSecond = setInterval(fetchData, 3000);
        return () => clearInterval(threeSecond);
    }, []);

    const sendNewMessage = async (newMessage: newMessage) => {
        try {
           await axiosApi.post('/messages' ,newMessage)
            void fetchData()
        } catch (error) {
            setError(error as AxiosError);
        }
    }

    if (error) {
        return <div>{error.message}</div>;
    } else
        return (
            <>
                <div className="flex-fill">
                    {posts.map(post => (
                        <Messages post={post} key={post.id}/>
                    ))}
                </div>
                <div className='ms-5'>
                    <SendMessage onSendMessage={sendNewMessage}/>
                </div>
            </>
        )
}

export default App