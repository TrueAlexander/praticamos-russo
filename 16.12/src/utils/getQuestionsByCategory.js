const getQuestionsByCategory = async (category) => {

  // const endpointF = `${process.env.URL_BASE}/api/admin/${category}`
  const endpointF = `/api/admin/${category}`

  const data = await (await fetch(endpointF, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
  })).json().then((response) => {
    const result = response.questions
    return result
  })
  
  if (data) {
    return data
  } else {
    return []
  }  
}

export default getQuestionsByCategory