import React, {FormEvent, useState} from 'react';
import {newMessage} from '../../../types.ts';
import {Button, Grid, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Props {
  onSendMessage: (message: newMessage) => void;
}

const SendMessage: React.FC<Props> = ({onSendMessage}) => {
  const [state, setState] = useState<newMessage>({
    author: '',
    message: '',
  })
  const submitMessage = (e: FormEvent) => {
    e.preventDefault();
    onSendMessage({...state});
    setState({author: '', message: ''});
  }
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitMessage}>
      <h3>Send Message</h3>
      <Grid item>
        <TextField
          required
          label="Author"
          id="author"
          name="author"
          value={state.author}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <TextField
          required
          multiline
          minRows={3}
          label="Message"
          id="message"
          name="message"
          value={state.message}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <Button
          type="submit"
          variant="contained"
        >
          <span style={{marginRight: '20px'}}>Send</span>
          <SendIcon/>
        </Button>
      </Grid>
    </Grid>
  );
};

export default SendMessage;