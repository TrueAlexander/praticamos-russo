import Pagination from '../pagination/Pagination'
import Card from '../card/Card'

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

const CardList = async ({page, catSlug, author, tag}) => {

  // const {posts, count} = await getPosts(page, catSlug, author, tag)

  const count = 1
  const posts = [{
    slug: "slug",
    title: "Title1",
    content: "content contentcontent contentcontent contentcontent content content contentcontent contentcontent contentcontent content content contentcontent contentcontent contentcontent contentcontent contentcontent content",
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
    slug: "slug",
    title: "Title2",
    content: "content content content contentcontent contentcontent contentcontent contentcontent contentcontent contentcontent contentcontent contentcontent contentcontent content",
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
        {posts?.map((item) => (
          <Card item={item} key={item._id}/>
        ))}
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} catSlug={catSlug} author={author} tag={tag}/>
    </div>
  )
}

export default CardList