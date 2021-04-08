import styled from 'styled-components';
import { useQuery } from 'react-query';
import AuthorsListItem from 'components/AuthorsListItem/AuthorsListItem';
import { fetchAuthors } from 'api';
import { AuthorsType } from 'types';

const AuthorsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

const AuthorsList = () => {
  const { data, isLoading, error } = useQuery('fetchAuthors', fetchAuthors);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError(error)) {
    return <span>{error.message}</span>;
  }

  return (
    <AuthorsWrapper>
      {data.length === 0 ? (
        <h2>here you see authors</h2>
      ) : (
        data.map(({ name, id }: AuthorsType) => <AuthorsListItem id={id} key={id} name={name} />)
      )}
    </AuthorsWrapper>
  );
};

export default AuthorsList;
