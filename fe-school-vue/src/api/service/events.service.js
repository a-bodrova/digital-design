export default api => {
  api.tasks = {
    getTasks(filter, page, limit) {
      return api.instance.request({
        method: 'post',
        url: 'tasks',
        data: {
          filter,
          page,
          limit,
        },
      });
    },
  }
}