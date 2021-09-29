const filterReducer = (state = '', action) => { 
  switch (action.type) {
    case 'FILTER_INPUT':
      return action.content
    default:    
      return state
  }
}

export const filterInput = (content) => {
  return {
    type: 'FILTER_INPUT',
    content
  }
}

export default filterReducer