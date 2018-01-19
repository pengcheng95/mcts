const user = (state = {
}, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
      return {
        userId: action.obj.id,
        username: action.obj.username,
        bookmarked: action.obj.bookmarked,
        description: action.obj.description,
        writtenPoem: action.obj.writtenPoem
      }
    default:
      return state
  }
}

export default user;