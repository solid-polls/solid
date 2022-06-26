import { useMutation, useQuery, useQueryClient } from 'react-query';
import { answersApi, pollsApi } from './api';
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Answer, Poll, Question } from './client';
import useVoteClient, { VoteClient } from './hooks/useVoteClient';
import LoadedPoll from './components/LoadedPoll';

type PollPageProps = {
  params: { code: string };
};

export default function PollPage(props: PollPageProps) {
  const { isLoading, isSuccess, isError, data, error } = useQuery(
    ['poll', props.params.code],
    () => pollsApi.pollControllerFindByCode({ code: props.params.code }),
  );
  const queryClient = useQueryClient();
  const voteClient = useVoteClient(props.params.code);
  useEffect(() => {
    if (!voteClient) {
      return;
    }
    voteClient.on('update', (payload) => {
      queryClient.invalidateQueries(['poll', props.params.code]);
    });
    return () => {
      voteClient.removeListener('update');
    };
  }, [voteClient]);

  return (
    <>
      {isLoading ||
        (!voteClient && <Typography variant='body1'>Loading ...</Typography>)}
      {isSuccess && voteClient && (
        <LoadedPoll poll={data} voteClient={voteClient} />
      )}
      {isError && (
        <Typography variant='body1'>
          Could not fetch resource: {JSON.stringify(error)}
        </Typography>
      )}
    </>
  );
}
