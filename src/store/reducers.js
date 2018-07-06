export const INCREMENT_A = 'INCREMENT_A'
export const INCREMENT_B = 'INCREMENT_B'
export const INCREMENT_C = 'INCREMENT_C'

const initialState = {
  a: 0,
  children: {
    b: 0,
    c: 0,
  },
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INCREMENT_A: {
      return { ...state, a: state.a + 1 }
    }
    case INCREMENT_B: {
      return {
        ...state,
        children: { b: state.children.b + 1, c: state.children.c },
      }
    }
    case INCREMENT_C: {
      return {
        ...state,
        children: { b: state.children.b, c: state.children.c + 1 },
      }
    }
    default: {
      return state
    }
  }
}

export const incrementA = () => ({ type: INCREMENT_A })
export const incrementB = () => ({ type: INCREMENT_B })
export const incrementC = () => ({ type: INCREMENT_C })

export default reducer
