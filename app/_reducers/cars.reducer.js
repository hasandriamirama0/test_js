export function cars(state={ items:[] }, action) {
  switch(action.type) {
    case 'CAR_PAGE_LOADED':
      return {
        ...state,
        items: action.data.cars
      };
    case 'CAR_SUBMIT':
      return {
        ...state,
        items: ([action.data.car]).concat(state.items)
      };
    case 'CAR_DELETE':
      return {
        ...state,
        items: state.items.filter((car) => car._id !== action._id)
      };
    case 'CAR_SET_EDIT':
      return {
        ...state,
        carToEdit: action.car
      };
    case 'CAR_EDIT':
      return {
        ...state,
        items: state.items.map((car) => {
          if(car._id === action.data.car._id) {
            return {
              ...action.data.car
            }
          }
          return car;
        }).sort((x, y) => x.updatedAt > y.updatedAt ? -1 : 1),
        carToEdit: undefined
      }
    default:
      return state;
  }
}
