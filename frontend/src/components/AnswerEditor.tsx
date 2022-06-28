import { Check, Close, Delete, Edit } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment } from '@mui/material';
import { useRef, useState } from 'react';
import { CreateAnswerState } from '../CreatePollPage';

export type AnswerEditorProps = {
  answer: CreateAnswerState;
  onChange: (newText: string) => void;
  onDelete: () => void;
};

export default function AnswerEditor(props: AnswerEditorProps) {
  const [isEditMode, setEditMode] = useState(false);
  const text = useRef<HTMLInputElement>();

  function enableEditMode() {
    setEditMode(true);
    text.current?.focus();
    text.current?.select();
  }

  function cancelEditMode() {
    setEditMode(false);
    if (text.current) {
      text.current.value = props.answer.text;
    }
  }
  function saveEditMode() {
    setEditMode(false);
    props.onChange(text.current?.value ?? '');
  }

  return (
    <FormControl variant='standard' focused={isEditMode}>
      <Input
        type='text'
        defaultValue={props.answer.text}
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
            <>
              <InputAdornment position='end'>
                <IconButton type='button' onClick={enableEditMode}>
                  <Edit />
                </IconButton>
              </InputAdornment>
              <InputAdornment position='end'>
                <IconButton type='button' onClick={props.onDelete}>
                  <Delete />
                </IconButton>
              </InputAdornment>
            </>
          )
        }
        inputRef={text}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === 'Accept') saveEditMode();
          if (event.key === 'Escape') cancelEditMode();
        }}
      />
    </FormControl>
  );
}
