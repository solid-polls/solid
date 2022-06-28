import { Check, Close, Edit } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Stack,
} from '@mui/material';
import { useRef, useState } from 'react';
import { CreateQuestionState } from '../CreatePollPage';
import AnswerEditor from './AnswerEditor';

interface QuestionEditorProps {
  question: CreateQuestionState;
  onDelete: () => void;
  onChangeText: (newTitle: string) => void;
  onAddAnswer: () => void;
  onChangeAnswer: (answerId: number, newText: string) => void;
  onDeleteAnswer: (answerId: number) => void;
}

export default function QuestionEditor(props: QuestionEditorProps) {
  const [isEditMode, setEditMode] = useState(false);
  const title = useRef<HTMLInputElement>();

  function enableEditMode() {
    setEditMode(true);
    title.current?.focus();
    title.current?.select();
  }

  function cancelEditMode() {
    setEditMode(false);
    if (title.current) {
      title.current.value = props.question.text;
    }
  }
  function saveEditMode() {
    setEditMode(false);
    props.onChangeText(title.current?.value ?? '');
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <FormControl variant='standard' focused={isEditMode}>
            <Input
              type='text'
              defaultValue={props.question.text}
              readOnly={!isEditMode}
              endAdornment={
                isEditMode ? (
                  <>
                    <InputAdornment position='end'>
                      <IconButton type='button' onClick={cancelEditMode}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                    <InputAdornment position='end'>
                      <IconButton type='button' onClick={saveEditMode}>
                        <Check />
                      </IconButton>
                    </InputAdornment>
                  </>
                ) : (
                  <InputAdornment position='end'>
                    <IconButton type='button' onClick={enableEditMode}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                )
              }
              sx={{ typography: 'h5' }}
              inputRef={title}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === 'Accept')
                  saveEditMode();
                if (event.key === 'Escape') cancelEditMode();
              }}
            />
          </FormControl>
          <Divider />
          {props.question.answers.map((answer) => (
            <AnswerEditor
              key={answer.id}
              answer={answer}
              onChange={(newText) => props.onChangeAnswer(answer.id, newText)}
              onDelete={() => props.onDeleteAnswer(answer.id)}
            />
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          color='warning'
          size='small'
          type='button'
          onClick={props.onDelete}
        >
          Delete Question
        </Button>
        <Button size='small' type='button' onClick={props.onAddAnswer}>
          Add answer
        </Button>
      </CardActions>
    </Card>
  );
}
