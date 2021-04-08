import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation } from 'react-query';
import Form from 'components/FormWrapper/FormWraper';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from 'assets/styles/useStyles';
import { fetchAuthors, addSong } from 'api';
import { SongType, AuthorsType } from 'types';
import Header from 'components/Header/Header';

const SongsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

const SongsForm = () => {
  const { register, handleSubmit, control } = useForm<SongType>();
  const classes = useStyles();
  const { data, isLoading, error } = useQuery('fetchAuthors', fetchAuthors);
  const { mutateAsync, isLoading: isSongAdding } = useMutation(addSong);
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError(error)) {
    return <span>{error.message}</span>;
  }

  const onSubmit = async (data: any) => {
    await mutateAsync(data);
  };

  return (
    <SongsWrapper>
      <Header>Add some songs to author</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={
            <Select
              {...register('author', {
                required: true,
              })}
            >
              {data.map(({ id, name }: AuthorsType) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          }
          name="author"
          control={control}
          defaultValue=""
          type="text"
          variant="outlined"
          className={classes.selectField}
          labelId="author"
        />

        <Controller
          as={<TextField />}
          name="title"
          control={control}
          variant="outlined"
          rules={{
            required: true,
            minLength: 1,
            maxLength: 50,
          }}
          type="text"
          label="song title"
          defaultValue=""
          className={classes.addField}
          autoComplete="off"
        />

        <Controller
          as={<TextField />}
          name="duration"
          control={control}
          variant="outlined"
          type="number"
          label="duration (sec)"
          defaultValue=""
          className={classes.addField}
          rules={{
            required: true,
            min: 3,
            max: 9999,
          }}
        />
        <SubmitButton text={isSongAdding ? 'Adding...' : 'Add song'} />
      </Form>
    </SongsWrapper>
  );
};

export default SongsForm;
