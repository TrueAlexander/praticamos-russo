import Pagination from '../pagination/Pagination'
import Card from '../card/Card'

interface Post {
  _id?: string
  slug: string
  title: string
  content: string
  img: string
  views: number
  catSlug: string
  author: string
  authorEmail: string
  category: string
  comments: any[]
  images: any[]
  likedBy: any[]
  tags: string[]
}

interface CardListProps {
  page: number
}

// const getPosts = async (page, catSlug, author, tag) => {

//   try {

//     const res = await fetch(`${process.env.BASE_URL}/api/get-posts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ catSlug, page, author, tag }),
//       cache: "no-store",
//     })
//     const data = await res.json()
//     return data
    
//     } catch (error) {
//     console.log(error)
//   }  
// }

const CardList = async ({page}: CardListProps) => {

  // const {posts, count} = await getPosts(page, catSlug, author, tag)

  const count = 1
  const posts: Post[] = [{
    slug: "slug1",
    title: " Title1Title1Title1Title1Title1 Title1Title1 Title1Title1Title1Title1 Title1Title1Title1Title1",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, optio? Reiciendis qui temporibus earum reprehenderit ullam doloribus ut dignissimos? Placeat neque quibusdam doloribus soluta, veritatis illo odio laudantium libero rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, optio? Reiciendis qui temporibus earum reprehenderit ullam doloribus ut dignissimos? Placeat neque quibusdam doloribus soluta, veritatis illo odio laudantium libero rerum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, optio? Reiciendis qui temporibus earum reprehenderit ullam doloribus ut dignissimos? Placeat neque quibusdam doloribus soluta, veritatis illo odio laudantium libero rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, optio? Reiciendis qui temporibus earum reprehenderit ullam doloribus ut dignissimos? Placeat neque quibusdam doloribus soluta, veritatis illo odio laudantium libero rerum!",
    
    img: "/rus.jpg",
    views: 0,
    catSlug: "slug",
    author: "Admin",
    authorEmail: "caminante.msk@gmail.com",
    category: "category",
    comments: [],
    images: [],
    likedBy: [],
    tags: ["one", "two"]
  }, 
  {
    slug: "slug2",
    title: "Title2",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, optio? Reiciendis qui temporibus earum reprehenderit ullam doloribus ut dignissimos? Placeat neque quibusdam doloribus soluta, veritatis illo odio laudantium libero rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, optio? Reiciendis qui temporibus earum reprehenderit ullam doloribus ut dignissimos? Placeat neque quibusdam doloribus soluta, veritatis illo odio laudantium libero rerum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, optio? Reiciendis qui temporibus earum reprehenderit ullam doloribus ut dignissimos? Placeat neque quibusdam doloribus soluta, veritatis illo odio laudantium libero rerum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, optio? Reiciendis qui temporibus earum reprehenderit ullam doloribus ut dignissimos? Placeat neque quibusdam doloribus soluta, veritatis illo odio laudantium libero rerum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, optio? Reiciendis qui temporibus earum reprehenderit ullam doloribus ut dignissimos? Placeat neque quibusdam doloribus soluta, veritatis illo odio laudantium libero rerum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, optio? Reiciendis qui temporibus earum reprehenderit ullam doloribus ut dignissimos? Placeat neque quibusdam doloribus soluta, veritatis illo odio laudantium libero rerum! contentcontent contentcontent contentcontent contentcontent contentcontent contentcontent contentcontent content",
    img: "/rus1.jpg",
    views: 21,
    catSlug: "slug",
    author: "Admin",
    authorEmail: "caminante.msk@gmail.com",
    category: "category",
    comments: [],
    images: [],
    likedBy: [],
    tags: ["one", "two"]
  }]
  
  const POST_PER_PAGE = 5

  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  return (
    <div className="text-white flex-[5] overflow-x-hidden max-w-full">
      <h3 className="text-[25px] tracking-widest font-bold mb-5">RUSSOLINGUO Blog</h3>
      <div>
        {posts?.map((item, index) => (
          <Card item={item} key={item._id || index}/>
        ))}
      </div>
      {/* <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} /> */}
    </div>
  )
}

export default CardList