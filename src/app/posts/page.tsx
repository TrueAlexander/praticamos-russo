// import CardList from "@/components/blog/cardList/CardList"
import CardList from "@/components/blog/cardList/CardList"
// import InfoModal from "@/components/user/infoModal/infoModal"
import ButtonAuthWrapper from "@/components/globals/ButtonAuthWrapper/ButtonAuthWrapper"

export const metadata = {
  title: "Blog",
  description: "Blog da língua russa. Russolinguo | Praticamos russo | Aprendemos russo | Vocabulário, verbos, casos...",
  openGraph: {
    title: "Blog da língua russa | Russolinguo | Praticamos russo | Aprendemos russo",
    description: "Russolinguo | Praticamos russo | Aprendemos russo | Vocabulário, verbos, casos...",
    url: "https://russolinguo.com/posts",
    siteName: "Russolinguo",
    type: "website",
    images: [
      {
        url: "https://i.ibb.co/Y33yVng/img-OGextra-Big.png'", 
        width: 1200,
        height: 630,
        alt: "Russolinguo Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://russolinguo.com/posts",
  },
}

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
