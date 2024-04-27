const OnlyNameShow = ({nameShow}) => {
  return (
    <p className="text-[#9f50ac] absolute -translate-x-1/2 left-12 top-5 animate__animated   animate__fadeIn animate-slower">
        Olá, {nameShow.length > 12 ? nameShow.slice(0, 9) + "..." : nameShow}!
    </p>
  )
}

export default OnlyNameShow
