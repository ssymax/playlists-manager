import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import Form from 'components/FormWrapper/FormWraper';
import TextField from '@material-ui/core/TextField';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import Header from 'components/Header/Header';
import { useStyles } from 'assets/styles/useStyles';
import { addAuthor } from 'api';
import { AuthorsType } from 'types';

const AuthorsForm = () => {
  const { register, handleSubmit, control } = useForm<AuthorsType>();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isError } = useMutation(addAuthor);

  const onSubmit = async (data: any, e: any) => {
    e.target.reset();
    await mutateAsync(data);
    queryClient.refetchQueries('fetchAuthors');
  };

  const classes = useStyles();

  if (isError) {
    return <span>Error</span>;
  }
  return (
    <>
      <Header>Add some songs authors</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={<TextField />}
          name="name"
          control={control}
          variant="outlined"
          {...register('name', {
            minLength: 3,
            required: true,
            maxLength: 50,
          })}
          type="text"
          label="author"
          defaultValue=""
          className={classes.addField}
          autoComplete="off"
          rules={{
            minLength: 1,
            required: true,
            maxLength: 50,
          }}
        />
        <SubmitButton text={isLoading ? 'Adding...' : 'Add author'} />
      </Form>
    </>
  );
};

export default AuthorsForm;
