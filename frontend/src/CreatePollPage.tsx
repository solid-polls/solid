import {
  Alert,
  AlertTitle,
  Button,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Children, useReducer, useState } from 'react';
import { pollsApi } from './api';
import { Poll } from './client';
import QuestionEditor from './components/QuestionEditor';

export type CreateAnswerState = { id: number; text: string };
export type CreateQuestionState = {
  id: number;
  text: string;
  answers: Array<CreateAnswerState>;
  answerCounter: number;
};
type CreatePollState = {
  title: string;
  questions: Array<CreateQuestionState>;
  questionCounter: number;
  created: boolean;
  failed: boolean;
  pollCode?: string;
};

type PollReducerAction =
  | { type: 'updateTitle'; title: string }
  | { type: 'addQuestion' }
  | { type: 'deleteQuestion'; questionId: number }
  | { type: 'updateQuestionText'; questionId: number; newText: string }
  | { type: 'addAnswer'; questionId: number }
  | {
      type: 'changeAnswer';
      questionId: number;
      answerId: number;
      newText: string;
    }
  | { type: 'deleteAnswer'; questionId: number; answerId: number }
  | { type: 'pollCreated'; pollCode: string }
  | { type: 'creationFailed' };

function pollReducer(
  state: CreatePollState,
  action: PollReducerAction,
): CreatePollState {
  switch (action.type) {
    case 'updateTitle':
      return { ...state, title: action.title };
    case 'addQuestion': {
      const newCounter = state.questionCounter + 1;
      return {
        ...state,
        questionCounter: newCounter,
        questions: [
          ...state.questions,
          {
            id: state.questionCounter,
            text: `New question #${newCounter}`,
            answers: [],
            answerCounter: 0,
          },
        ],
      };
    }
    case 'deleteQuestion': {
      const index = state.questions.findIndex(
        (question) => question.id === action.questionId,
      );
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, index),
          ...state.questions.slice(index + 1),
        ],
      };
    }
    case 'updateQuestionText': {
      const index = state.questions.findIndex(
        (question) => question.id === action.questionId,
      );
      const questions = state.questions;
      questions[index].text = action.newText;
      return { ...state, questions };
    }
    case 'addAnswer': {
      const index = state.questions.findIndex(
        (question) => question.id === action.questionId,
      );
      if (index === -1) return { ...state };
      const question = state.questions[index];
      const newCounter = question.answerCounter + 1;
      const newQuestion = {
        ...question,
        answerCounter: newCounter,
        answers: [
          ...question.answers,
          {
            id: question.answerCounter,
            text: `New answer #${newCounter}`,
          },
        ],
      };
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, index),
          newQuestion,
          ...state.questions.slice(index + 1),
        ],
      };
    }
    case 'changeAnswer': {
      const questionIndex = state.questions.findIndex(
        (question) => question.id === action.questionId,
      );
      if (questionIndex === -1) return { ...state };
      const question = state.questions[questionIndex];
      const answerIndex = question.answers.findIndex(
        (answer) => answer.id === action.answerId,
      );
      if (answerIndex === -1) return { ...state };
      const answer = question.answers[answerIndex];
      const newAnswer = {
        ...answer,
        text: action.newText,
      };
      const newQuestion = {
        ...question,
        answers: [
          ...question.answers.slice(0, answerIndex),
          newAnswer,
          ...question.answers.slice(answerIndex + 1),
        ],
      };
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, questionIndex),
          newQuestion,
          ...state.questions.slice(questionIndex + 1),
        ],
      };
    }
    case 'deleteAnswer': {
      const questionIndex = state.questions.findIndex(
        (question) => question.id === action.questionId,
      );
      if (questionIndex === -1) return { ...state };
      const question = state.questions[questionIndex];
      const answerIndex = question.answers.findIndex(
        (answer) => answer.id === action.answerId,
      );
      const newQuestion = {
        ...question,
        answers: [
          ...question.answers.slice(0, answerIndex),
          ...question.answers.slice(answerIndex + 1),
        ],
      };
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, questionIndex),
          newQuestion,
          ...state.questions.slice(questionIndex + 1),
        ],
      };
    }
    case 'pollCreated':
      return {
        ...state,
        created: true,
        failed: false,
        pollCode: action.pollCode,
      };
    case 'creationFailed':
      return {
        ...state,
        created: false,
        failed: true,
        pollCode: undefined,
      };
  }
}

export default function CreatePollPage() {
  const [{ title, questions, created, pollCode }, dispatch] = useReducer(
    pollReducer,
    {
      title: '',
      questions: [],
      questionCounter: 0,
      created: false,
      failed: true,
    },
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  function setTtile(newTitle: string) {
    dispatch({ type: 'updateTitle', title: newTitle });
  }
  function addQuestion() {
    dispatch({ type: 'addQuestion' });
  }
  function deleteQuestion(questionId: number) {
    dispatch({ type: 'deleteQuestion', questionId });
  }
  function changeQuestionText(questionId: number, newText: string) {
    dispatch({ type: 'updateQuestionText', questionId, newText });
  }
  function addAnswer(questionId: number) {
    dispatch({ type: 'addAnswer', questionId });
  }
  function changeAnswer(questionId: number, answerId: number, newText: string) {
    dispatch({ type: 'changeAnswer', questionId, answerId, newText });
  }
  function deleteAnswer(questionId: number, answerId: number) {
    dispatch({ type: 'deleteAnswer', questionId, answerId });
  }
  function onPollCreated(poll: Poll) {
    dispatch({ type: 'pollCreated', pollCode: poll.code });
    setSnackbarOpen(true);
  }
  function onCreationFailed() {
    dispatch({ type: 'creationFailed' });
    setSnackbarOpen(true);
  }

  function createPoll() {
    pollsApi
      .pollControllerCreate({
        createPollDto: {
          title,
          questions: questions.map((question) => ({
            text: question.text,
            answers: question.answers.map((answer) => ({
              text: answer.text,
            })),
          })),
        },
      })
      .then((poll) => onPollCreated(poll))
      .catch(() => onCreationFailed());
  }

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        {created ? (
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity='success'
            sx={{ width: '100%' }}
          >
            <AlertTitle>Poll created</AlertTitle>
            Use code {pollCode}.
          </Alert>
        ) : (
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity='error'
            sx={{ width: '100%' }}
          >
            <AlertTitle>Poll creation failed</AlertTitle>
            Please check your internet connection.
          </Alert>
        )}
      </Snackbar>
      <Stack spacing={2}>
        <Typography variant='h3'>Create a new poll</Typography>
        <Typography variant='h4'>General data</Typography>
        <TextField
          label='Title'
          type='text'
          variant='outlined'
          value={title}
          onChange={(event) => setTtile(event.target.value)}
        />
        <Typography variant='h4'>Questions</Typography>
        {Children.toArray(
          questions.map((question) => (
            <QuestionEditor
              key={question.id}
              question={question}
              onDelete={() => deleteQuestion(question.id)}
              onChangeText={(newTitle) =>
                changeQuestionText(question.id, newTitle)
              }
              onAddAnswer={() => addAnswer(question.id)}
              onChangeAnswer={(answerId, newText) =>
                changeAnswer(question.id, answerId, newText)
              }
              onDeleteAnswer={(answerId) => deleteAnswer(question.id, answerId)}
            />
          )),
        )}
        <Button variant='contained' type='button' onClick={addQuestion}>
          Add question
        </Button>
        <Divider />
        <Button variant='contained' type='button' onClick={createPoll}>
          Create poll
        </Button>
      </Stack>
    </>
  );
}
