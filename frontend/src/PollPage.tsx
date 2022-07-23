import { Socket } from 'socket.io-client';
import { useQuery, useQueryClient } from 'react-query';
import { pollsApi } from './api';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useVoteClient from './hooks/useVoteClient';
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
  const [isSubscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if (!voteClient) {
      return;
    }
    voteClient.on('update', () => {
      queryClient.invalidateQueries(['poll', props.params.code]);
    });
    return () => {
      voteClient.removeListener('update');
    };
  }, [voteClient]);

  if (isSuccess && voteClient && data.questions.length > 0 && !isSubscribed) {
    voteClient.emit('subscribeToQuestion', data.questions[0].id.toString());
    setSubscribed(true);
  }

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
