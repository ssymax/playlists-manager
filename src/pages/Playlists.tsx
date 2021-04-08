import styled from 'styled-components';
import SongToPlaylistForm from 'components/SongsToPlaylistForm/SongsToPlaylistForm';
import PlaylistsDND from 'components/PlaylistsDnD/PlaylistsDnD';
import Header from 'components/Header/Header';
const StyledWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 400px auto;
  padding: 20px;
`;

const StyledHeader = styled(Header)`
  margin-bottom: 50px;
`;

const Playlists = () => {
  return (
    <>
      <StyledHeader>create playlists</StyledHeader>
      <StyledWrapper>
        <SongToPlaylistForm />
        <PlaylistsDND />
      </StyledWrapper>
    </>
  );
};

export default Playlists;
