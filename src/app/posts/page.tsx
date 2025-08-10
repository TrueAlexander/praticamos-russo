// import CardList from "@/components/blog/cardList/CardList"
import CardList from "@/components/blog/cardList/CardList"
// import InfoModal from "@/components/user/infoModal/infoModal"
import ButtonAuthWrapper from "@/components/globals/ButtonAuthWrapper/ButtonAuthWrapper"


// export const metadata = {
//   title: "MotoPost | Espaço de motociclistas",
//   description: "Descubra o mundo das motos com notícias, viagens, estilo, oficina, e motopédia. Espaço para todos os motociclistas.",
//   openGraph: {
//     title: "MotoPost | Espaço de motociclistas",
//     description: "Descubra o mundo das motos com notícias, viagens, estilo, oficina, e motopédia.",
//     url: "https://motopost.com.br",
//     siteName: "MotoPost",
//     type: "website",
//     images: [
//       {
//         url: "https://motopost.com.br/opengraph-image.jpg", 
//         width: 1200,
//         height: 630,
//         alt: "MotoPost homepage",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//   },
//   alternates: {
//     canonical: "https://motopost.com.br",
//   },
// }

interface BlogProps {
  searchParams: {
    page?: string
    verified?: string
  }
}


export default function Blog({searchParams}: BlogProps) {

  const page = parseInt(searchParams.page ?? "1", 10) || 1

  // const verified = searchParams.verified ? JSON.parse(searchParams.verified) : false

  return (
    <>
      <div className="absolute top-0 left-0 right-0" >
        <ButtonAuthWrapper/>
      </div>
      <div className="fixed z-[10000] top-[140px] bg-[#2b2737] pt-5 mx-8 bottom-12 overflow-y-auto text-center max-w-[1200px]">
        {/* <InfoModal info={verified}/> */}

        <div>
          <CardList page={page} />
        </div>
      </div>
    </>

  )
}
