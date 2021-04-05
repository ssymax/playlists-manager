import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { childrenPropsType } from 'types';

const PageWrapper = styled.div`
  width: 80%;
  height: 70%;
  background-color: hsla(0, 100%, 100%, 0.5);
  border-radius: 10px;
  display: flex;
  padding: 30px;
  justify-content: space-around;
  z-index: 3;
`;

const PageHeader = styled.h1`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  color: white;
  font-size: 100px;
  letter-spacing: 50px;
  z-index: 2;
  top: 6.5%;
  right: 10%;
  text-align: right;
  overflow: hidden;
  user-select: none;
  padding: 10px 0;
`;

const PageTemplate = ({ children }: childrenPropsType) => {
  const location = useLocation();
  const { pathname } = location;
  const header = pathname.replace('/', '');

  return (
    <>
      <PageWrapper>
        <PageHeader>{header}</PageHeader>
        {children}
      </PageWrapper>
    </>
  );
};

export default PageTemplate;
