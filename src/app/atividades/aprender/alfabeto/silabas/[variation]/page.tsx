import dbConnect from "@/utils/dbFront"
import SyllableExerciseModel from "@/models/SyllableExercise"
import Button from "@/components/globals/Button/Button"
import QuizSyllable from "@/components/syllables/QuizSyllable/QuizSyllable"

type Params = {
  params: { variation: string }
}

export default async function VariationPage({ params }: Params) {
  try {
    await dbConnect()

    const exercises = await SyllableExerciseModel.find({
      variation: decodeURIComponent(params.variation),
    }).lean()
   

    return (
      <main className="text-center flex flex-col justify-center">
        <h1 className="text-white p-3 font-bold text-[22px]">Sílabas I</h1>
        <p className="text-[#9f50ac] text-[18px] -mt-2 mb-2">(consoante + vogal)</p>
        <p className="text-white text-[18px]">Ouça e selecione a sílaba que ouviu:</p>
        {exercises.length === 0 ? ( 
          <>
            <p className="text-[#9f50ac] text-[18px] mt-4">Nenhum exercício encontrado&#128546;</p>
            <p className="text-white text-[18px] my-4">Por favor, tente novamente mais tarde!</p>
          </>

        ) : (
          <>
            <QuizSyllable 
              exercises={exercises} 
              totalExercises={2} 
              variation={params.variation}
            />
            {/* <ul className="space-y-4">
              {exercises.map((exercise) => (
                <li key={exercise._id.toString()} className="">
                  <p className="text-white text-[18px]">Ouça e selecione a sílaba que ouviu:</p>

                  <div className='inline-block'>
                    <div 
                      // htmlFor="audio"
                      // onClick={() => handlePlay(index + 1)}
                      className='ml-3 inline-block hover:text-[#a050ac]  active:text-[#a050ac] text-lg text-white mt-5 mb-3 scale-[2]'
                    >
                      <CgPlayButtonO />
                    </div>
                    <audio 
                      // id={`audio${index + 1}`}
                      controls 
                      className="mx-auto hidden"
                    >
                      <source 
                        src={exercise.audioUrl} 
                        type="audio/mpeg" 
                      />
                      Your browser does not support the audio tag.
                    </audio>
                  </div>  


                  <div className="text-center flex flex-col justify-center">
                    {exercise.options.map((option: string, i: number) => (
                      <Button 
                      key={i}
                      addStyle={"my-2"} 
                      text={option} 
                      disabled={false} 
                      // href='/atividades/aprender/alfabeto/silabas/cv'
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul> */}
          </>
        )}
        <p className='text-[#9f50ac] pb-1 text-[18px] '>
          ou
        </p>
        <Button
          text="Voltar" 
          disabled={false} 
          href='/atividades/aprender/alfabeto/silabas'
        />
      </main>
    )
  } catch (error) {
    console.error("DB connection or query failed:", error)
    return (
      <main className="text-center flex flex-col justify-center">
        <h1 className="text-white p-3 pt-6 font-bold text-[22px]">Erro ao carregar os exercícios...&#128546;</h1>
        <p className="text-[#9f50ac] text-[18px]">Desculpe, não foi possível carregar os exercícios no momento... </p>
        <p className="text-white text-[18px]">Por favor, tente novamente mais tarde</p>
        <p className='text-[#9f50ac] pt-6 pb-1 text-[18px] '>
         ou
        </p>
        <Button
          text="Voltar" 
          disabled={false} 
          href='/atividades/aprender/alfabeto/silabas'
        />
      </main>
    )
  }
}
