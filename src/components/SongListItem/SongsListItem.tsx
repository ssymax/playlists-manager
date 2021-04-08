import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import TextField from '@material-ui/core/TextField';
import EditIcon from 'components/EditIcon/EditIcon';
import DeleteIcon from 'components/DeleteIcon/DeleteIcon';
import Loader from 'react-loader-spinner';
import Modal from '@material-ui/core/Modal';
import { Controller, useForm } from 'react-hook-form';
import { deleteSong, updateSong } from 'api';
import { SongType } from 'types';
import { useStyles } from 'assets/styles/useStyles';
import SubmitButton from 'components/SubmitButton/SubmitButton';


const StyledForm = styled.form`
  background-color: hsla(0, 100%, 100%, 0.3);
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledInnerWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  width: 435px;
  height: 50px;
  grid-template-columns: 100px 200px 50px 30px 30px;
  align-items: center;
  justify-items: center;
  font-size: 14px;
  text-transform: uppercase;
  color: hsl(0, 0%, 100%);
  border-radius: 5px;
  border: 2px solid #2f3f59;
  margin-bottom: 10px;
  p {
    font-size: 12px;
    padding-left: 8px;
  }
`;

const SongsListItem = ({ id, title, author, duration }: SongType) => {
  const [isModal, setModal] = useState<boolean>(false);

  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

  const queryClient = useQueryClient();

  const { register, handleSubmit, control } = useForm<SongType>();

  const { mutateAsync, isLoading } = useMutation(deleteSong);
  const { mutateAsync: changeSong } = useMutation(updateSong);

  const removeSong = async () => {
    await mutateAsync(id);
    queryClient.refetchQueries('fetchSongs');
  };

  const onSubmit = async (data: any) => {
    await changeSong({ ...data, id });
    queryClient.refetchQueries('fetchSongs');
    handleClose();
  };

  const classes = useStyles();

  return (
    <>
      <StyledInnerWrapper>
        <p>{author.name}</p>
        <p>{title}</p>
        <p>{duration}</p>

        <EditIcon onClick={handleOpen} />

        <Modal className={classes.modal} open={isModal} onClose={handleClose}>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={<TextField />}
              name="title"
              control={control}
              {...register('title', {
                minLength: 1,
                required: true,
                maxLength: 50,
              })}
              variant="outlined"
              type="text"
              label="title"
              defaultValue={title}
              id="title"
              className={classes.addField}
            />
            <Controller
              as={<TextField />}
              name="duration"
              control={control}
              {...register('duration', {
                minLength: 1,
                required: true,
                maxLength: 50,
              })}
              variant="outlined"
              type="number"
              label="duration"
              defaultValue={duration}
              className={classes.addField}
            />
            <SubmitButton text="change" />
          </StyledForm>
        </Modal>

        {isLoading ? (
          <Loader type="Oval" color="#fff" height={10} width={10} />
        ) : (
          <DeleteIcon onClick={removeSong} />
        )}
      </StyledInnerWrapper>
    </>
  );
};

export default SongsListItem;
