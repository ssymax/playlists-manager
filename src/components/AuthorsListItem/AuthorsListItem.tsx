import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import Loader from 'react-loader-spinner';
import { deleteAuthor, updateAuthor } from 'api';
import { AuthorsType } from 'types';

const StyledInnerWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 30px 30px;
  place-items: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: hsl(0, 0%, 100%);
  background-color: hsl(120, 68%, 42%);
  padding: 15px;
  border-radius: 5px;
  align-self: center;
`;

const ItemForm = styled.form`
  display: flex;
  align-items: center;
`;

const StyledSubmitButton = styled.button`
  background-color: transparent;
  margin-left: 20px;
  width: auto;
  display: flex;
  border: none;
  font-size: 10px;
  justify-content: center;
  outline: none;
  &:hover {
    color: black;
  }
`;

const StyledDeleteIcon = styled(HighlightOffIcon)`
  justify-self: center;
  &:hover {
    cursor: pointer;
    fill: hsl(0, 0%, 0%);
  }
`;

const StyledEditIcon = styled(EditIcon)`
  justify-self: center;

  &:hover {
    cursor: pointer;
    fill: hsl(0, 0%, 0%);
  }
`;

const AuthorsListItem = ({ name, id }: AuthorsType) => {
  const [isInput, setInput] = useState<boolean>(false);

  const { register, handleSubmit, control } = useForm<AuthorsType>();

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(deleteAuthor);
  const { mutateAsync: mutateAuthor } = useMutation(updateAuthor);

  const readAuthor = () => {
    setInput(true);
  };

  const removeAuthor = async () => {
    await mutateAsync(id);
    queryClient.refetchQueries('fetchAuthors');
  };

  const onSubmit = async (data: any) => {
    await mutateAuthor({ ...data, id });
    queryClient.refetchQueries('fetchAuthors');
    await setInput(false);
  };

  return (
    <StyledInnerWrapper>
      {isInput ? (
        <ItemForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={<TextField />}
            name="name"
            control={control}
            {...register('name', {
              minLength: 1,
              required: true,
              maxLength: 50,
            })}
            id="standard-basic"
            type="text"
            label="Author"
            defaultValue={name}
          />
          <StyledSubmitButton type="submit">CHANGE</StyledSubmitButton>
        </ItemForm>
      ) : (
        <p>{name}</p>
      )}

      <StyledEditIcon onClick={readAuthor} />

      {isLoading ? (
        <Loader type="Oval" color="#fff" height={10} width={10} />
      ) : (
        <StyledDeleteIcon onClick={removeAuthor} />
      )}
    </StyledInnerWrapper>
  );
};

export default AuthorsListItem;
