import Button from '@/components/globals/Button/Button'

const Silabas = (): JSX.Element | null => {

  return (
    <main className='text-center flex flex-col justify-center' >
      <p className='text-white p-3 pt-6 font-bold text-[22px]'>Lemos silabas</p>
      <p className='text-[#9f50ac] text-[18px] '>
        escolha uma atividade: 
      </p>
      <Button 
        addStyle={"my-2"} 
        text="Sílabas I" 
        disabled={false} 
        href='/atividades/aprender/alfabeto/silabas/cv'
      />
      <Button 
        addStyle={"my-2"} 
        text="Sílabas II" 
        disabled={true} 
        href='/atividades/aprender/alfabeto/silabas/vc' 
      />
      <Button 
        addStyle={"my-2"} 
        text="Sílabas III" 
        disabled={true} 
        href='/atividades/aprender/alfabeto/silabas/cvc'
      />
      <p className='text-[#9f50ac] pb-1 text-[18px] '>
        ou
      </p>
      <Button
        text="Voltar" 
        disabled={false} 
        href='/atividades/aprender/alfabeto'
      />
    </main>
  )
   
}

export default Silabas