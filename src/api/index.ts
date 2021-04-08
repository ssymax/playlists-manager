import axios from 'axios';

// post author
export const addAuthor = async (author: any) => {
  const { data } = await axios.post('http://sandbox.aurafutures.io/ssymax-authors', author);
  return data;
};

// get author

export const getAuthor = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, { id }] = queryKey;
  const { data } = await axios.get(`http://sandbox.aurafutures.io/ssymax-authors/${id}`);
  return data;
};

// get all authors

export const fetchAuthors = async () => {
  const { data } = await axios.get('http://sandbox.aurafutures.io/ssymax-authors');
  return data;
};

// put author

export const updateAuthor = async ({ id, ...data }: { id: any; data: any }) => {
  const response = await axios.put(`http://sandbox.aurafutures.io/ssymax-authors/${id}`, data);
  return response.data;
};

// delete single author
export const deleteAuthor = async (id: any) => {
  const { data } = await axios.delete(`http://sandbox.aurafutures.io/ssymax-authors/${id}`);
  return data;
};

// post song

export const addSong = async (song: any) => {
  const { data } = await axios.post('http://sandbox.aurafutures.io/ssymax-songs', song);
  return data;
};

// get all songs

export const fetchSongs = async () => {
  const { data } = await axios.get('http://sandbox.aurafutures.io/ssymax-songs');
  return data;
};

//get song

export const getSong = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, { id }] = queryKey;
  const { data } = await axios.get(`http://sandbox.aurafutures.io/ssymax-songs/${id}`);
  return data;
};

// put song

export const updateSong = async ({ id, ...data }: { id: any; data: any }) => {
  const response = await axios.put(`http://sandbox.aurafutures.io/ssymax-songs/${id}`, data);
  return response.data;
};

// delete single author
export const deleteSong = async (id: any) => {
  const { data } = await axios.delete(`http://sandbox.aurafutures.io/ssymax-songs/${id}`);
  return data;
};

// post playlist

export const addPlaylist = async (author: any) => {
  const { data } = await axios.post('http://sandbox.aurafutures.io/ssymax-playlists', author);
  return data;
};

// get playlist

export const getPlaylist = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, { id }] = queryKey;
  const { data } = await axios.get(`http://sandbox.aurafutures.io/ssymax-playlists/${id}`);
  return data;
};

// get all playlists

export const fetchPlaylists = async () => {
  const { data } = await axios.get('http://sandbox.aurafutures.io/ssymax-playlists');
  return data;
};

// update playlist

export const updatePlaylist = async ({ id, ...data }: { id: any; data: any }) => {
  const response = await axios.put(`http://sandbox.aurafutures.io/ssymax-playlists/${id}`, data);
  return response.data;
};

// delete playlist
export const deletePlaylist = async (id: any) => {
  const { data } = await axios.delete(`http://sandbox.aurafutures.io/ssymax-playlists/${id}`);
  return data;
};
