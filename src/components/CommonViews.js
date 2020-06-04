import { Container } from '@material-ui/core'
import styled, { css } from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import React from 'react'
import Box from '@material-ui/core/Box'

export const cssFlexMixin = css`
  display: flex;
  flex-flow: ${props => props.flexflow || 'row wrap'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
`

export const FlexBreak = styled.div`
  width: 100%;
`

export const FlexBox = styled(Box)`
  ${cssFlexMixin}
`

export const FlexContainer = styled(Container)`
  ${cssFlexMixin}
`

export const RootFlexView = styled(FlexContainer)`
    padding: 60px 0 60px 0;
`

export const StyledTextField = styled(TextField)`
  margin-top: 10px;
`

export const FormButtons = ({ submitText, backUrl, disabled }) => (
  <StyledFormButtons>
    <Button href={backUrl}
            color="default"
            variant="contained"
            style={{ marginRight: '10px' }}>
      Go back
    </Button>
    <Button type="submit"
            color="secondary"
            disabled={disabled || false}
            variant="contained">
      {submitText || 'Submit'}
    </Button>
  </StyledFormButtons>)

const StyledFormButtons = styled(FlexBox)`
  margin-top: 50px;
  justify-content: flex-end;
`