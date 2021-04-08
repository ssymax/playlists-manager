import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import Input from '@material-ui/core/Input';
import DeleteIcon from 'components/DeleteIcon/DeleteIcon';
import EditIcon from 'components/EditIcon/EditIcon';
import Loader from 'react-loader-spinner';
import { deleteAuthor, updateAuthor } from 'api';
import { AuthorsType } from 'types';

const StyledInnerWrapper = styled.div`
  display: grid;
  width: 300px;
  height: 50px;
  grid-template-columns: 200px 30px 30px;
  place-items: center;
  font-size: 14px;
  text-transform: uppercase;
  color: hsl(0, 0%, 100%);
  border-radius: 5px;
  border: 2px solid #2f3f59;
  margin-bottom: 10px;
`;

const ItemForm = styled.form`
  display: flex;
  align-self: center;
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
    await queryClient.refetchQueries('fetchAuthors');
    await setInput(false);
  };

  return (
    <StyledInnerWrapper>
      {isInput ? (
        <ItemForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={<Input />}
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

      <EditIcon onClick={readAuthor} />

      {isLoading ? (
        <Loader type="Oval" color="#fff" height={10} width={10} />
      ) : (
        <DeleteIcon onClick={removeAuthor} />
      )}
    </StyledInnerWrapper>
  );
};

export default AuthorsListItem;
