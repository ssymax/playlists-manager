import styled from 'styled-components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const DeleteIcon = styled(HighlightOffIcon)`
  justify-self: center;
  &:hover {
    cursor: pointer;
    fill: hsl(0, 0%, 0%);
  }
`;

export default DeleteIcon;
