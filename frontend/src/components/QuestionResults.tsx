import { Question } from '../client';
import { Stack, Typography } from '@mui/material';

interface QuestionResultsProps {
  question: Question;
}

export default function QuestionResults(props: QuestionResultsProps) {
  return (
    <Stack>
      <Typography variant='body1'>
        The question: {JSON.stringify(props.question)}
      </Typography>
    </Stack>
  );
}
