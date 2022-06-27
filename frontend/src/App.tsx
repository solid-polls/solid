import { Link, Route, Switch, useLocation } from 'wouter';
import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import PollPage from './PollPage';
import HomePage from './HomePage';

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} marginBottom={3}>
        <AppBar position='static'>
          <Toolbar>
            <Link href='/'>
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1, cursor: 'pointer' }}
              >
                SolidPolls
              </Typography>
            </Link>
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth='md'>
        <Switch>
          <Route path='/poll/:code' component={PollPage} />
          <Route path='/' component={HomePage} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
