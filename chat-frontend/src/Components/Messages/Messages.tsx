import React from 'react';
import {Message} from '../../types.ts';
import {Card, CardActions, CardContent, CardHeader, Paper} from '@mui/material';
import dayjs from 'dayjs';

interface Props {
  post: Message;
}

const Messages: React.FC<Props> = ({post}) => {
  return (
    <div className="mb-5">
      <Card key={post.id} className="text-center">
        <CardHeader>Author: {post.author}</CardHeader>
        <CardContent>
          <CardActions>
            {post.message}
          </CardActions>
        </CardContent>
        <Paper className="text-muted">
          {dayjs(post.datetime).format('MMMM D, YYYY h:mm A')}
        </Paper>
      </Card>
    </div>
  );
};

export default Messages;