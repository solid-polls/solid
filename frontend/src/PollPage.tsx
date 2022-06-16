import { useQuery } from 'react-query';
import { pollsApi } from './api';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { Poll } from './client';

type PollPageProps = {
  params: { code: string };
};

interface UpdatePayload {
  questions: [{ id: number; votes: number }];
}

interface ServerToClientEvents {
  update: (payload: UpdatePayload) => void;
}

interface VotePayload {
  pollCode: number;
  questionID: number;
  answerID: number;
}

interface ClientToServerEvents {
  vote: (payload: VotePayload) => void;
}

type VoteClient = Socket<ClientToServerEvents, ServerToClientEvents>;

function useVoteClient(pollCode: string): VoteClient | null {
  const [voteClient, setVoteClient] = useState<VoteClient | null>(null);
  useEffect(() => {
    const client = io(
      import.meta.env.PROD
        ? 'https://app.solidpolls.de/api'
        : 'http://localhost:3000',
      { transports: ['websocket'] },
    );
    setVoteClient(client);
    return () => {
      if (client !== null) {
        client.close();
      }
    };
  }, [pollCode]);
  return voteClient;
}

interface QuestionResultsProps {
  poll: Poll;
  questionIndex: number;
  voteClient: VoteClient;
}

function QuestionResults(props: QuestionResultsProps) {
  useEffect(() => {
    props.voteClient.on('update', (payload) => {
      console.log(payload);
    });
    return () => {
      props.voteClient.removeListener('update');
    };
  }, [props.voteClient]);

  return (
    <Typography variant='body1'>
      The poll: {JSON.stringify(props.poll)}
    </Typography>
  );
}

interface QuestionVoterProps {
  poll: Poll;
  questionIndex: number;
  voteClient: VoteClient;
  onAfterVote: () => void;
}

function QuestionVoter(props: QuestionVoterProps) {
  const onVote = () => {
    props.voteClient.emit('vote', {});
    props.onAfterVote();
  };
  return <Button onClick={onVote}>Vote</Button>;
}

export default function PollPage(props: PollPageProps) {
  const { isLoading, isSuccess, isError, data, error } = useQuery(
    ['poll', props.params.code],
    () => pollsApi.pollControllerFindByCode({ code: props.params.code }),
  );
  const voteClient = useVoteClient(props.params.code);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [voted, setVoted] = useState<Set<number>>(new Set());

  return (
    <>
      <Typography variant='h1'>Poll Page</Typography>
      {isLoading ||
        (!voteClient && <Typography variant='body1'>Loading ...</Typography>)}
      {isSuccess &&
        voteClient &&
        (voted.has(questionIndex) ? (
          <QuestionResults
            poll={data}
            voteClient={voteClient}
            questionIndex={questionIndex}
          />
        ) : (
          <QuestionVoter
            poll={data}
            voteClient={voteClient}
            questionIndex={questionIndex}
            onAfterVote={() => {
              setVoted(new Set([...voted, questionIndex]));
            }}
          />
        ))}
      {isError && (
        <Typography variant='body1'>
          Could not fetch resource: {JSON.stringify(error)}
        </Typography>
      )}
    </>
  );
}
