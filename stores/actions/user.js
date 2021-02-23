const endpoint = 'http://192.168.1.3:3000/login'

export function loginStart () {
  return {
    type: 'LOGIN_START'
  }
}

export function loginSuccess (data) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: data
  }
}

export function loginFailed (error) {
  return {
    type: 'LOGIN_FAILED',
    payload: error
  }
}

export function fetchLogin (payload) {
  return async (dispatch) => {
    try {

      dispatch(loginStart())
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(payload)
      })


      console.log('>>>>', JSON.stringify(res))

      if (!res.ok) {
        throw Error(res.statusText)
      }

      const data = await res.json()
      dispatch(loginSuccess(data.access_token))

    } catch (err) {
      dispatch(loginFailed(err))
      console.log('err', err)
    }
  }
}

export function fetchLogout (payload) {
  return {
    type: 'LOGOUT'
  }
}
