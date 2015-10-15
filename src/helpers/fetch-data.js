const getFetchDataMethod = (component = {}) => {
  return component.WrappedComponent ?
    getFetchDataMethod(component.WrappedComponent) :
    component.fetchData
}

export default ({components, getState, dispatch, location, params}) => {
  return components
    .filter(component => getFetchDataMethod(component)) // only look at ones with a static fetchData()
    .map(getFetchDataMethod)                            // pull out fetchData methods
    .map(fetchData => fetchData({getState, dispatch, location, params})) // call fetchData methods and save promises
}
