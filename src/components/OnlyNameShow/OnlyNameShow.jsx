

const OnlyNameShow = ({nameShow}) => {
  return (
    <p className="text-[#9f50ac] absolute left-1/2 -translate-x-1/2 left-5 top-5 animate__animated   animate__fadeIn animate-slower">
        Olá, {nameShow.length > 12 ? nameShow.slice(0, 9) + "..." : nameShow}!
    </p>
  )
}

export default OnlyNameShow
