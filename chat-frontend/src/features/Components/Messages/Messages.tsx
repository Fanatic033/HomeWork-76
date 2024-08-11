import React from 'react';
import {Message} from '../../../types.ts';
import {Avatar, Card, CardContent, CardHeader, Typography} from '@mui/material';
import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';

interface Props {
  post: Message;
}

dayjs.extend(isYesterday);

const Messages: React.FC<Props> = ({post}) => {
  const dateMessage = dayjs(post.datetime)
let formattedDate

  if(dateMessage.isYesterday()){
     formattedDate = 'Добавлено вчера'
  }else{
     formattedDate = dateMessage.format('DD.MM.YYYY HH:mm')
  }

  return (
    <Card key={post.id} sx={{maxWidth: 1000, margin: 'auto', borderRadius: 2, boxShadow: 3, marginBottom: 2}}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: 'purple', width: '60px', height: '60px'}}>
            {post.author[0].toUpperCase()}
          </Avatar>
        }
        title={
          <>
            <span>Author</span>
            <Typography variant="h6" sx={{marginBottom: '10px'}}>{post.author}</Typography>
          </>
        }
        subheader={
          <>
            <span>message</span>
            <Typography variant="body1" color="textPrimary">
              {post.message}
            </Typography>
          </>
        }
      />
      <CardContent>

        <Typography variant="body1"
                    color="textSecondary"
        >
           {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Messages;