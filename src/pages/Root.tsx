import { BrowserRouter as Router, Route } from 'react-router-dom';
import GlobalStyle from 'assets/styles/GlobalStyle';
import Authors from 'pages/Authors';
import Songs from 'pages/Songs';
import Playlists from 'pages/Playlists';

const Root = () => {
  return (
    <Router>
      <GlobalStyle />
      <Route path="/" exact component={Authors} />
      <Route path="/songs" component={Songs} />
      <Route path="/playlists" component={Playlists} />
    </Router>
  );
};

export default Root;
