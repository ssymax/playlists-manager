import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import GlobalStyle from 'assets/styles/GlobalStyle';
import MainTemplate from 'templates/MainTemplate';
import Authors from 'pages/Authors';
import Songs from 'pages/Songs';
import Playlists from 'pages//Playlists';

export const queryClient = new QueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <GlobalStyle />
        <MainTemplate>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/authors" />} />
            <Route path="/authors" component={Authors} />
            <Route path="/songs" component={Songs} />
            <Route path="/playlists" component={Playlists} />
          </Switch>
        </MainTemplate>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Root;
