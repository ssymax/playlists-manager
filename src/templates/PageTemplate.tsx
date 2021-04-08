import styled from 'styled-components';
import { childrenPropsType } from 'types';

const PageWrapper = styled.div`
  width: 100%;
  background-color: hsla(0, 100%, 100%, 0.5);
  padding: 60px 20px;
`;

const PageTemplate = ({ children }: childrenPropsType) => (
  <>
    <PageWrapper>{children}</PageWrapper>
  </>
);

export default PageTemplate;
