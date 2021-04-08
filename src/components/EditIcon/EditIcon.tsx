import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';

const StyledEditIcon = styled(EditIcon)`
  justify-self: center;

  &:hover {
    cursor: pointer;
    fill: hsl(0, 0%, 0%);
  }
`;

export default StyledEditIcon;
