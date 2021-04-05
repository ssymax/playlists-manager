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
