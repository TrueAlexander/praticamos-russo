const showEmojis = (num: number, sum: number) => {
  const emojis = {
    lessThan50: <span>&#128528;</span>,
    moreThan50: <span>&#128512;</span>
  }
 return num / sum >= 0.5 ? emojis.moreThan50 : emojis.lessThan50
}

export default showEmojis
