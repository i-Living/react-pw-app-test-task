import {
  GO_TO_SIGNIN_FORM,
  GO_TO_SIGNUP_FORM
} from '../actionTypes'

export const goToSignIn = () => dispatch => {
  dispatch({
    type: GO_TO_SIGNIN_FORM
  })
}

export const goToSignUp = () => dispatch => {
  dispatch({
    type: GO_TO_SIGNUP_FORM
  })
}
