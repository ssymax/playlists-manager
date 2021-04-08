import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { SubmitButtonType } from 'types';

const StyledButton = styled(Button)({
  backgroundColor: 'hsl(213, 29%, 37%)',
  border: 0,
  borderRadius: 3,
  color: 'hsl(0, 0%, 100%)',
  height: 48,
  padding: '0 30px',
  fontSize: '1.4rem',
  letterSpacing: '1px',
  width: '200px',
  marginLeft: '10px',
  '&:hover': {
    background: 'hsla(108, 100%, 39%, 0.7)',
  },
});

const SubmitButton = ({ text }: SubmitButtonType) => (
  <StyledButton type="submit">{text}</StyledButton>
);

export default SubmitButton;
