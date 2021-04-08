import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavWrapper = styled.nav`
  display: flex;
  height: 150px;
  width: 100%;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 20;
  background-color: #2f3f59;
`;

const NavLinksWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 300px;
  height: 100%;
  list-style: none;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: hsl(0, 0%, 100%);
  &.active {
    opacity: 0.7;
  }
`;

const Navigation = () => {
  return (
    <StyledNavWrapper>
      <NavLinksWrapper>
        <li>
          <StyledLink activeClassName="active" to="/authors">
            authors
          </StyledLink>
        </li>
        <li>
          <StyledLink activeClassName="active" to="/songs">
            songs
          </StyledLink>
        </li>
        <li>
          <StyledLink activeClassName="active" to="/playlists">
            playlists
          </StyledLink>
        </li>
      </NavLinksWrapper>
    </StyledNavWrapper>
  );
};

export default Navigation;
