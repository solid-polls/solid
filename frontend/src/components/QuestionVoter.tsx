import { Question } from '../client';
import { useMutation } from 'react-query';
import { answersApi } from '../api';
import { useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

interface QuestionVoterProps {
  pollId: number;
  question: Question;
  onAfterVote: () => void;
}

export default function QuestionVoter(props: QuestionVoterProps) {
  const { mutate } = useMutation(
    'vote',
    (answerId: number) =>
      answersApi.answerControllerVote({
        pollId: props.pollId,
        questionId: props.question.id,
        answerId,
      }),
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
