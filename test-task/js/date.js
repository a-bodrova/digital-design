function getDayInfo(string) {
  const dateInString = `${string.split('.').reverse().join('-')}T04:00:00`;
  const date = new Date(dateInString);
  const daysOfWeek = {
    0: 'Воскресенье',
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота',
  };

  const months = {
    0: 'Января',
    1: 'Февраля',
    2: 'Марта',
    3: 'Апреля',
    4: 'Мая',
    5: 'Июня',
    6: 'Июля',
    7: 'Августа',
    8: 'Сентября',
    9: 'Октября',
    10: 'Ноября',
    11: 'Декабря',
  };

  const dayOfWeek = daysOfWeek[date.getDay()];

  const dayIndex = 6;
  const amountOfDaysInWeek = 7;
  const weekOfMonth = Math.ceil((date.getDate() + (dayIndex - date.getDay())) / amountOfDaysInWeek);

  const month = months[date.getMonth()];
  const year = date.getFullYear();
  console.log(`${dayOfWeek}, ${weekOfMonth} неделя ${month} ${year} года`);
  return `${dayOfWeek}, ${weekOfMonth} неделя ${month} ${year} года`;
}