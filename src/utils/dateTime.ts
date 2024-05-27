export const formatISODate = (value: string, showTime: boolean = false) => (
  showTime ?
    new Date(value).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
  :
    new Date(value).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })
);

export const getTimeFromISOString = (isoDate: string) => (
  new Date(isoDate).toLocaleTimeString('en', { timeStyle: 'short', hour12: false })
);

export const getDayFromISO = (isoDate: string) => {
  const date = new Date(isoDate).getDate();
  if (date < 10) return `0${date}`
  return date;
}

export const getMonthFromISO = (isoDate: string) => {
  return new Date(isoDate).getMonth();
}

export const getDaysPeriodFromISO = (isoDate: string) => {
  const deltaMSeconds = (new Date()).getTime() - (new Date(isoDate)).getTime();
  const deltaDays = Math.floor(deltaMSeconds / 24 / 60 / 60 / 1000);

  return deltaDays;
}