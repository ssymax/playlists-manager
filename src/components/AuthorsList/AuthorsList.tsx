import styled from 'styled-components';
import { useQuery } from 'react-query';
import AuthorsListItem from 'components/AuthorsListItem/AuthorsListItem';
import { fetchAuthors } from 'api';
import { AuthorsType } from 'types';

const StyledAuthorsList = styled.div`
  display: flex;
  width: 300px;
  justify-content: center;
  flex-direction: column;
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
    <StyledAuthorsList>
      {data.length === 0 ? (
        <h1>add some authors</h1>
      ) : (
        data.map(({ name, id }: AuthorsType) => <AuthorsListItem id={id} key={id} name={name} />)
      )}
    </StyledAuthorsList>
  );
};

export default AuthorsList;
