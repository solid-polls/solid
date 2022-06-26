import { Poll } from '../client';
import { VoteClient } from '../hooks/useVoteClient';
import { useState } from 'react';
import { Typography } from '@mui/material';
import QuestionVoter from './QuestionVoter';
import QuestionResults from './QuestionResults';

interface LoadedPollProps {
  poll: Poll;
  voteClient: VoteClient;
}

export default function LoadedPoll(props: LoadedPollProps) {
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
