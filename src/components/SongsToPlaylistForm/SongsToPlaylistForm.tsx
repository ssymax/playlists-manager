import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation } from 'react-query';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { fetchSongs, addPlaylist } from 'api';
import { useStyles } from 'assets/styles/useStyles';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import Header from 'components/Header/Header';
import { SongType } from 'types';

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledHeader = styled(Header)`
  margin: 20px 0;
`;

export const Schema = Yup.object().shape({
  songs: Yup.array()
    .transform((ids) => {
      return ids.filter((id: number) => {
        return id === 0 || id;
      });
    })
    .min(1, 'Select at least one'),
});

const SongToPLaylistForm = () => {
  const { data: fetchedSongs, isLoading: isSongsLoading } = useQuery('fetchSongs', fetchSongs);

  const { mutateAsync, isLoading: isMutating } = useMutation(addPlaylist);

  const { control, handleSubmit, getValues, errors, register } = useForm({
    resolver: yupResolver(Schema),
  });

  const classes = useStyles();

  if (isSongsLoading) {
    return <span>Loading...</span>;
  }

  const handleCheck = (checkedId: number) => {
    const { songs: ids } = getValues();
    const newIds = ids?.includes(checkedId)
      ? ids?.filter((id: number) => id !== checkedId)
      : [...(ids ?? []), checkedId];
    return newIds;
  };

  const onSubmit = async (data: any) => {
    await mutateAsync(data);
    window.location.reload(); 
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledHeader>add name</StyledHeader>
      <FormControl error={(errors.songs as any)?.message}>
        <FormHelperText>{(errors.songs as any)?.message}</FormHelperText>
        <Controller
          as={<TextField />}
          name="name"
          control={control}
          variant="outlined"
          type="text"
          label="playlist name"
          defaultValue=""
          className={classes.addField}
          autoComplete="off"
          {...register("test", {
            maxLength: 50,
            minLength: 3,
            required: true,
        })}
        />
        <StyledHeader>pick songs</StyledHeader>
        <Controller
          name="songs"
          render={(props) =>
            fetchedSongs.map(({id, author, title}: SongType) => (
              <FormControlLabel
                control={<Checkbox onChange={() => props.onChange(handleCheck(id))} />}
                key={id}
                label={`${author.name} - ${title}`}
              />
            ))
          }
          control={control}
        />
      </FormControl>
      <StyledHeader>. . . and create</StyledHeader>
      <SubmitButton text={isMutating ? 'Adding...' : 'Add playlist'} />
    </StyledForm>
  );
};

export default SongToPLaylistForm;
