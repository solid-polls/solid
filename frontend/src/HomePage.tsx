import { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'wouter';
import useSetPageTitle from './hooks/useSetPageTitle';

export default function HomePage() {
  const [code, setCode] = useState('');
  useSetPageTitle('Home');
  return (
    <Stack spacing={1}>
      <Typography variant='h3' marginBottom={1}>
        SolidPolls
      </Typography>
      <Typography variant='body1'>Please enter your poll code:</Typography>
      <TextField
        label='Poll code'
        placeholder='12345678'
        type='text'
        variant='outlined'
        onChange={(event) => setCode(event.target.value)}
      />
      <Link href={`/poll/${code}`}>
        <Button variant='contained' type='submit'>
          Join
        </Button>
      </Link>
    </Stack>
  );
}
