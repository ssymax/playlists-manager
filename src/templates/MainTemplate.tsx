import { childrenPropsType } from 'types';
import Navigation from 'components/Navigation/Navigation';
import PageTemplate from 'templates/PageTemplate';

const MainTemplate = ({ children }: childrenPropsType) => {
  return (
    <>
      <Navigation />
      <PageTemplate>{children}</PageTemplate>
    </>
  );
};

export default MainTemplate;
