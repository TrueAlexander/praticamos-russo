"use client"

const CreateCaseBasic = () => {

  const handleCreate = async () => {

    ///send POST request
    const newCase = {
      case: "acusativo",
      question: "Мой брат на за́втрак ест ... (хлеб) с сы́ром.",
      correct_answer: "хлеб",
      answers: ["хлеб", "хле́бом", "хле́ба", "с хле́бом"],
      incorrect_answers: ["хле́бом", "хле́ба", "с хле́бом"] 
    }
    
    //А́ Е́ И́ О́ У́ Ы́ Э́ Ю́ Я́ а́ е́ и́ о́ у́ ы́ э́ ю́ я́
  
    try {
      const res = await fetch("/api/case/create-case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCase),
      }) 
      if (res.status === 201) {
       alert("success!")
      } else if (res.status === 400) {
        alert("ooops!")
      }
    }  catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Create Case</h2>
      <button onClick={handleCreate}>Create to test</button>
    </div>
  )
}

export default CreateCaseBasic