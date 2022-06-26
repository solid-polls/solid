import { Answer, Question } from '../client';
import { Container, Stack, Typography } from '@mui/material';
import Chart from 'react-apexcharts';

interface QuestionResultsProps {
  question: Question;
}

export default function QuestionResults(props: QuestionResultsProps) {
  const series = [];
  const labels = [];
  const title = props.question.text;

  // The order of these changes on database changes by voting, to maintain a stable chart, we need to sort the answers by name
  const answers = props.question.answers.sort(answerSorter);

  for (const answer of answers) {
    series.push(answer.count);
    labels.push(answer.text);
  }

  const options = {
    labels,
    theme: {
      mode: 'dark' as const,
    },
    chart: {
      background: 'none',
      fontFamily: 'Roboto',
    },
    legend: {
      position: 'top' as const,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
            },
          },
        },
      },
    },
  };

  return (
    <Stack>
      <Typography marginBottom={2}>{props.question.text}</Typography>
      <Container maxWidth='sm'>
        <Chart options={options} series={series} type='donut' width='100%' />
      </Container>
    </Stack>
  );
}

function answerSorter(a1: Answer, a2: Answer) {
  if (a1.text > a2.text) return 1;
  if (a1.text < a2.text) return -1;
  return 0;
}
