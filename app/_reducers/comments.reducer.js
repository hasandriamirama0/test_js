export function comments(state={ items:[] }, action) {
  switch(action.type) {
    case 'COMMENT_PAGE_LOADED':
      return {
        ...state,
        items: action.data.comments
      };
    case 'COMMENT_SUBMIT':
      return {
        ...state,
        items: ([action.data.comment]).concat(state.items)
      };
    case 'COMMENT_DELETE':
      return {
        ...state,
        items: state.items.filter((comment) => comment._id !== action._id)
      };
    case 'COMMENT_SET_EDIT':
      return {
        ...state,
        commentToEdit: action.comment
      };
    case 'COMMENT_EDIT':
      return {
        ...state,
        items: state.items.map((comment) => {
          if(comment._id === action.data.comment._id) {
            return {
              ...action.data.comment
            }
          }
          return comment;
        }).sort((x, y) => x.updatedAt > y.updatedAt ? -1 : 1),
        commentToEdit: undefined
      }
    default:
      return state;
  }
}
