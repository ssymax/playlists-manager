import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { deletePlaylist, fetchPlaylists } from 'api';
import DeleteIcon from 'components/DeleteIcon/DeleteIcon';
import { SongType, PlaylistType } from 'types';

const PlaylistWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Playlist = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  border-radius: 5px;
  width: 300px;
  border: 2px solid #2f3f59;
  margin-bottom: 50px;
  height: min-content;
`;

const PlaylistHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  border-bottom: 2px solid #2f3f59;
`;

const DurationSubheader = styled.div`
  display: flex;
  font-size: 12px;
  padding: 10px;
  justify-content: flex-end;
`;

const StyledSongsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SongWrapper = styled.span`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding: 3px;
  margin: 3px;
  border: 1px solid white;
  border-radius: 5px;
`;

const reorder = (list: [], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId.toNumber()] = sourceClone;
  result[droppableDestination.droppableId.toNumber()] = destClone;

  return result;
};

const PlaylistsDnD = () => {
  const { mutateAsync, isLoading } = useMutation(deletePlaylist);
  const { data, error, isLoading: isFetching } = useQuery('fetchPlaylists', fetchPlaylists);
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([[] as any]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setPlaylists(data as any);
      const songsArrays: any = [];
      data.forEach(({ songs }: any) => songsArrays.push(songs));
      setSongs(songsArrays);
    }
  }, [data]);

  if (isFetching) return <span>Loading...</span>;
  if (error) return <span>Error</span>;

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(songs[sInd], source.index, destination.index);

      const newSongsState = [...songs];
      newSongsState[sInd] = items;
      setSongs(newSongsState);

      const newPlaylistsState = [...playlists];
      newPlaylistsState.forEach((playlist: PlaylistType, index) => {
        playlist.songs = newSongsState[index];
      });
      setPlaylists(newPlaylistsState);
    } else {
      const result = move(songs[sInd], songs[dInd], source, destination);
      const newState = [...songs];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setSongs(newState.filter((group) => group.length));
    }
  };

  const removePlaylist = async (id: number) => {
    await mutateAsync(id);
    queryClient.refetchQueries('fetchPlaylists')
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <PlaylistWrapper>
      {playlists.map(({ id, name, songs }: PlaylistType, playlistIndex: number) => (
        <Playlist key={id}>
          <PlaylistHeader>
            <h4 style={{ color: '#2f3f59' }}>{name}</h4>
            <DeleteIcon onClick={() => removePlaylist(id)} />
          </PlaylistHeader>
          <DurationSubheader>
            duration: {songs.map((song) => song.duration).reduce((a, b) => a + b, 0)} s
          </DurationSubheader>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={playlistIndex.toString()} direction="vertical">
              {(provided) => (
                <StyledSongsWrapper {...provided.droppableProps} ref={provided.innerRef}>
                  {songs.map(({ id, title, duration }: SongType, index: number) => (
                    <Draggable key={id} draggableId={id.toString()} index={index}>
                      {(provided) => (
                        <SongWrapper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <p>{title}</p>
                          <p>{duration}</p>
                        </SongWrapper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </StyledSongsWrapper>
              )}
            </Droppable>
          </DragDropContext>
        </Playlist>
      ))}
    </PlaylistWrapper>
  );
};

export default PlaylistsDnD;
