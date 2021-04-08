import { useQuery } from 'react-query';
import SongsListItem from 'components/SongListItem/SongsListItem';
import { fetchSongs } from 'api';
import { SongType } from 'types';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

const SongsList = () => {
  const { data, isLoading, error } = useQuery('fetchSongs', fetchSongs);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError(error)) {
    return <span>{error.message}</span>;
  }

  return (
    <>
      {data.map(({ id, title, author, duration }: SongType) => (
        <SongsListItem key={id} id={id} title={title} author={author} duration={duration} />
      ))}
    </>
  );
};

export default SongsList;
