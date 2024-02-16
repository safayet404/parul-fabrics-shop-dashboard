
const ChangeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [month, day, year].join("-");
  
}

export default ChangeDateFormat