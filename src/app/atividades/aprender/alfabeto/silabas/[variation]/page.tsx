import dbConnect from "@/utils/dbFront"
import SyllableExerciseModel from "@/models/SyllableExercise"

type Params = {
  params: { variation: string }
}

export default async function VariationPage({ params }: Params) {
  try {
    await dbConnect()

    const exercises = await SyllableExerciseModel.find({
      variation: params.variation,
    }).lean()

    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Variation: {params.variation}</h1>
        {exercises.length === 0 ? (
          <p>Nenhum exercício encontrado.</p>
        ) : (
          <ul className="space-y-4">
            {exercises.map((exercise) => (
              <li key={exercise._id.toString()} className="border p-4 rounded shadow">
                <p className="text-lg font-medium">Слог: {exercise.syllable}</p>
                <audio controls src={exercise.audioUrl} className="my-2" />
                <div className="space-x-2 mt-2">
                  {exercise.options.map((option: string, i: number) => (
                    <button
                      key={i}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    )
  } catch (error) {
    console.error("DB connection or query failed:", error)
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Erro ao carregar os exercícios</h1>
        <p>Desculpe, não foi possível carregar os exercícios no momento. Por favor, tente novamente mais tarde.</p>
      </main>
    )
  }
}
