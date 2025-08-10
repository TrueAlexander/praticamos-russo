import Image from "next/image"
import Link from "next/link"
import Reactions from "../reactions/Reactions"
import Tags from "../tags/Tags"

interface PostItem {
  _id?: string
  slug: string
  title: string
  content: string
  img?: string | null
  tags?: string[]
}

interface CardProps {
  item: PostItem
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <article
      key={item._id}
      className="mb-12 flex items-center gap-12 border border-gray-400/20 shadow-[1px_3px_7px_-3px_rgba(128,128,128,0.7)] overflow-hidden flex-col md:flex-row-reverse"
    >
      <div
        className={`flex w-full gap-8 overflow-hidden ${
          item.img ? "flex-col md:flex-row-reverse" : "flex-col"
        }`}
      >
        {/* Текстовая колонка */}
        <div className="flex-1 relative pt-4 px-4 md:pt-4 md:px-4">
          <div className="relative">
            <Reactions id={item._id} />
          </div>

          <Link
            href={`/posts/${item.slug}`}
            className="flex flex-col"
          >
            <div className="relative h-[300px] overflow-hidden after:absolute after:left-0 after:bottom-0 after:w-full after:h-[45px] after:bg-gradient-to-b after:from-transparent">
              <h2
                className="mb-4 text-2xl leading-[33px] indent-8 break-words text-[white]"
                title={item.title}
              >
                {item.title}
              </h2>

              <p
                className="indent-8 text-base font-normal leading-6 h-[210px] text-[white] text-justify break-words overflow-hidden"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
            <p
              title="Leia a postagem completa"
              className="inline-block mb-2 border-b border-[#9f50ac] w-max active:border-b-2"
            >
              Leia mais
            </p>
          </Link>

          <Tags tags={item.tags ?? []} />
        </div>

        {/* Картинка или пустая колонка */}
        {item.img ? (
          <div className="flex-1">
            <Link href={`/posts/${item.slug}`}>
              <div
                title={item.title}
                className="relative h-full w-full overflow-hidden"
                style={{ minHeight: "200px" }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </article>

  )
}

export default Card

