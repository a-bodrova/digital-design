const LoadMore = ({handler}) => {

  return (
    <button
      className="load-more"
      type="button"
      onClick={handler}>
        Загрузить еще
    </button>
  )
}

export default LoadMore;
