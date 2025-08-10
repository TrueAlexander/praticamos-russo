// import styles from './tags.module.css'
// import Link from 'next/link'

// const Tags = ({tags}) => {

//   return (
//     <div className={styles.container}>
//       {tags?.map((item, index) => (
//         <Link href={`/blog/?tag=${item}`} className={styles.tag} key={index}>{item}</Link>
//       ))}
//     </div>
//   )
// }

// export default Tags

import Link from "next/link"

interface TagsProps {
  tags?: string[]
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="text-[#9f50ac] text-[14px] text-justify inline-block absolute bottom-2.5 right-0 max-w-[60%] sm:text-[13px] sm:bottom-1.5">
      {tags?.map((item, index) => (
        <Link
          href={`/blog/?tag=${encodeURIComponent(item)}`}
          key={index}
          className="inline-block mx-[10px] relative before:content-['#'] sm:mx-[7px]"
        >
          {item}
        </Link>
      ))}
    </div>
  )
}

export default Tags