import { pollsApi } from './api';
import { useQuery } from 'react-query';
import { Link, Route, Switch } from 'wouter';
import { useState } from 'react';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import PollPage from "./PollPage";

function HomePage() {
  const [code, setCode] = useState('');
  return (
    <>
      <Typography variant='h1'>Home</Typography>
      <Typography variant='body1'>Please type in the poll code:</Typography>
      <Stack spacing={1} marginTop={1}>
        <TextField
          label='Poll code'
          type='text'
          variant='outlined'
          onChange={(event) => setCode(event.target.value)}
        />
        <Link href={`/poll/${code}`}>
          <Button variant='contained' type='submit'>
            Join Poll
          </Button>
        </Link>
      </Stack>
    </>
  );
}

function App() {
  return (
    <Container maxWidth='sm'>
      {/* <div>
        <Link href="/">SolidPolls</Link>
      </div> */}

      <Switch>
        <Route path='/poll/:code' component={PollPage} />
        <Route path='/' component={HomePage} />
      </Switch>
    </Container>
  );
}

export default App;
