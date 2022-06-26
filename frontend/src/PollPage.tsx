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

type PollPageProps = {
  params: { code: string };
};

interface QuestionResultsProps {
  question: Question;
}

function QuestionResults(props: QuestionResultsProps) {
  return (
    <Stack>
      <Typography variant='body1'>
        The question: {JSON.stringify(props.question)}
      </Typography>
    </Stack>
  );
}

interface QuestionVoterProps {
  pollId: number;
  question: Question;
  onAfterVote: () => void;
}

function QuestionVoter(props: QuestionVoterProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    'vote',
    (answerId: number) =>
      answersApi
        .answerControllerVote({
          pollId: props.pollId,
          questionId: props.question.id,
          answerId,
        })
        .then(() => queryClient.invalidateQueries('poll')),
    { onSuccess: () => props.onAfterVote() },
  );
  const [selectedAnswerId, setSelectedAnswerId] = useState(-1);
  return (
    <Box>
      <Typography marginBottom={2}>{props.question.text}</Typography>
      {props.question.answers.length === 0 ? (
        <Typography>No answers were configured for this question.</Typography>
      ) : (
        <Box marginBottom={2}>
          <RadioGroup
            value={selectedAnswerId}
            onChange={(event) => setSelectedAnswerId(+event.target.value)}
          >
            {props.question.answers.map((answer) => (
              <FormControlLabel
                key={answer.id}
                control={<Radio />}
                label={answer.text}
                value={answer.id}
              />
            ))}
          </RadioGroup>
        </Box>
      )}
      <Button onClick={() => mutate(selectedAnswerId)} variant='contained'>
        Submit
      </Button>
    </Box>
  );
}

interface LoadedPollProps {
  poll: Poll;
  voteClient: VoteClient;
}

function LoadedPoll(props: LoadedPollProps) {
  const [questionIndex] = useState(0);
  const [voted, setVoted] = useState<Set<number>>(new Set());
  return (
    <>
      <Typography variant='h3' marginBottom={2}>
        {props.poll.title}
      </Typography>

      {questionIndex < props.poll.questions.length ? (
        <>
          {voted.has(questionIndex) ? (
            <QuestionResults question={props.poll.questions[questionIndex]} />
          ) : (
            <QuestionVoter
              question={props.poll.questions[questionIndex]}
              pollId={props.poll.id}
              onAfterVote={() => {
                setVoted(new Set([...voted, questionIndex]));
              }}
            />
          )}
        </>
      ) : (
        <Typography>No questions have been added to this poll yet.</Typography>
      )}
    </>
  );
}

export default function PollPage(props: PollPageProps) {
  const { isLoading, isSuccess, isError, data, error } = useQuery(
    ['poll', props.params.code],
    () => pollsApi.pollControllerFindByCode({ code: props.params.code }),
  );
  const voteClient = useVoteClient(props.params.code);
  useEffect(() => {
    if (!voteClient) {
      return;
    }
    voteClient.on('update', (payload) => {
      console.log('update', payload);
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
