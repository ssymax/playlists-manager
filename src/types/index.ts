// children prop type
export type childrenPropsType = { children: React.ReactNode };

// API objects values and inputs types
export type AuthorsType = {
  id: number;
  name: string;
};

export type SongType = {
  id: number;
  title: string;
  duration: number;
  author: AuthorsType;
  playlists: PlaylistType[];
};

export type PlaylistType = {
  id: number;
  name: string;
  songs: SongType[];
};

// submit button text type
export type SubmitButtonType = {
  text: string;
};
