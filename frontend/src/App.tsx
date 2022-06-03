import { defaultApi } from './api';
import { useQuery } from 'react-query';
import { Link, Route, Switch } from 'wouter';
import { useState } from 'react';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';

type PollPageProps = {
  params: { code: string };
};

function PollPage(props: PollPageProps) {
  const { isLoading, isSuccess, isError, data, error } = useQuery(
    ['poll', props.params.code],
    () => defaultApi.appControllerGetPoll({ code: +props.params.code }),
  );

  return (
    <>
      <Typography variant='h1'>Poll Page</Typography>
      {isLoading && <Typography variant='body1'>Loading ...</Typography>}
      {isSuccess && (
        <Typography variant='body1'>
          The poll: {JSON.stringify(data)}
        </Typography>
      )}
      {isError && (
        <Typography variant='body1'>
          Could not fetch resource: {JSON.stringify(error)}
        </Typography>
      )}
    </>
  );
}

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
