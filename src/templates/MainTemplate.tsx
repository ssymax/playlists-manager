import styled from 'styled-components';
import { childrenPropsType } from 'types';
import Navigation from 'components/Navigation/Navigation';
import PageTemplate from 'templates/PageTemplate';
const StyledMainWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainTemplate = ({ children }: childrenPropsType) => {
  return (
    <>
      <StyledMainWrapper>
        <PageTemplate>{children}</PageTemplate>
      </StyledMainWrapper>
      <Navigation />
    </>
  );
};

export default MainTemplate;
