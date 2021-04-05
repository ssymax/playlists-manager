import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import TextField from '@material-ui/core/TextField';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import { useStyles } from 'assets/styles/useStyles';
import { addAuthor } from 'api';
import { AuthorsType } from 'types';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: space-around;
  align-self: center;
`;

const AuthorsForm = () => {
  const { register, handleSubmit, control } = useForm<AuthorsType>();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(addAuthor, {
    onError: () => console.log('error'),
  });

  const onSubmit = async (data: any, e: any) => {
    e.target.reset();
    await mutateAsync(data);
    queryClient.refetchQueries('fetchAuthors');
  };

  const classes = useStyles();

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={<TextField />}
        name="name"
        control={control}
        variant="outlined"
        {...register('name', {
          minLength: 1,
          required: true,
          maxLength: 50,
        })}
        type="text"
        label="Author"
        defaultValue=""
        className={classes.addField}
      />
      <SubmitButton text={isLoading ? 'Adding...' : 'Add author'} />
    </StyledForm>
  );
};

export default AuthorsForm;
