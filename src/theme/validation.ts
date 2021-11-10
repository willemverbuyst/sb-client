import { makeStyles } from '@material-ui/core'

const useValidationStyles = makeStyles({
  input: {
    '& input + fieldset': {
      borderColor: '#f44336',
      borderWidth: '2px',
    },
  },
})

export { useValidationStyles }
