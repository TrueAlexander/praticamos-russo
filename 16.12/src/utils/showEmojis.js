
const showEmojis = (num, sum) => {
  const emojis = {
    lessThan50: <span>&#128528;</span>,
    moreThan50: <span>&#128512;</span>
  }
  if (num/sum >= 0.5) {
    return emojis.moreThan50
  } else {
    return emojis.lessThan50
  }
}

export default showEmojis
