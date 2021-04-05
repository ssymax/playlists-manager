import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  addField: {
    '& label': {
      color: 'white',
      fontSize: '12px',
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'hsl(120,68%,42%)',
      },
      '& input': {
        color: 'white',
      },
    },
  },
});
