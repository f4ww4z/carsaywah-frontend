import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { getUserTokenAndUserId, isAuthenticated, registerUser } from '../../_handlers/AuthHandler'
import { APP_NAME } from '../../constants/StringConstants'
import { Redirect } from 'react-router'
import { setSession } from '../../util/SessionUtil'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#d2ffc7',
    padding: '60px 0 60px 0',
  },
  registerContainer: {
    padding: '24px',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
  },
  registerForm: {
    display: 'flex',
    flexGrow: 1,
    flexFlow: 'column wrap',
  },
  registerButton: {
    marginTop: '56px',
  },
  errorText: {
    color: '#f50000',
  },
}))

const RegisterPage = () => {
  useEffect(() => {
    document.title = `Register | ${APP_NAME}`
  }, [])

  const s = useStyles()
  const { register, handleSubmit, errors } = useForm()

  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const onSubmit = async (data) => {
    setLoading(true)

    const { username, email, password } = data

    const newUser = await registerUser(username, email, password)

    if (newUser === undefined || Object.keys(newUser).length === 0) {
      setLoading(false)
      setErrorMessage('Username is taken or email address is not valid.')
      return
    }

    console.log(newUser)

    const { access, refresh, userId } = await getUserTokenAndUserId(username, password)

    if (access === undefined || refresh === undefined) {
      setLoading(false)
      setErrorMessage('Cannot login user at this time.')
      return
    }

    setErrorMessage('')
    setLoading(false)

    // save session and go to dashboard
    setSession({ access, refresh, username, userId })

    window.location.reload()
  }

  return (isAuthenticated() ?
      <Redirect to={{ pathname: '/dashboard' }}/>
      :
      <Box className={s.root}>
        <Container className={s.registerContainer}>
          <Typography variant="h2">
            Register
          </Typography>
          <Typography className={s.errorText} variant="h6">
            {errorMessage}
          </Typography>
          <form className={s.registerForm} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              name="username"
              type="text"
              label="Username"
              inputRef={register({ required: true })}
              error={!!errors.username}
            />
            <TextField
              name="email"
              type="email"
              label="Email"
              inputRef={register({ required: true })}
              error={!!errors.email}
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              inputRef={register({ required: true })}
              error={!!errors.password}
            />
            <Button className={s.registerButton}
                    type="submit"
                    color="secondary"
                    disabled={loading}
                    variant="contained">
              Register
            </Button>
          </form>
        </Container>
      </Box>
  )
}

export default RegisterPage
