import { useState } from 'react';
import {
  Alert,
  Button,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import useSetPageTitle from './hooks/useSetPageTitle';
import { pollsApi } from './api';
import { Link, useLocation } from 'wouter';

export default function HomePage() {
  const [code, setCode] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [, setLocation] = useLocation();
  useSetPageTitle('Home');
  return (
    <>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity='error'
          sx={{ width: '100%' }}
        >
          Poll not found.
        </Alert>
      </Snackbar>
      <Stack spacing={2}>
        <Typography variant='h3'>SolidPolls</Typography>
        <Typography variant='body1'>Please enter your poll code:</Typography>
        <TextField
          label='Poll code'
          type='text'
          variant='outlined'
          onChange={(event) => setCode(event.target.value)}
        />
        <Button
          variant='contained'
          type='submit'
          onClick={() =>
            pollsApi
              .pollControllerFindByCode({ code })
              .then((res) => setLocation(`/poll/${code}`))
              .catch(() => setSnackbarOpen(true))
          }
        >
          Join
        </Button>
        <Divider />
        <Typography variant='body1'>
          If you want to host a poll, you have to create a poll first.
        </Typography>
        <Link href='/new'>
          <Button variant='contained' type='button'>
            Create poll
          </Button>
        </Link>
      </Stack>
    </>
  );
}
