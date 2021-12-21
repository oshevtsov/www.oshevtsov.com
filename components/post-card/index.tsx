import Link from 'next/link'
import Date from '../date'
import { PostCardData } from '../../lib/posts'

interface Props {
  className: string
  postData: PostCardData
}

const PostCard = ({ className, postData }: Props) => {
  return (
    <article className={className}>
      <Link href={`/blog/${postData.id}`}>
        <a>
          <h3>{postData.frontMatter?.title}</h3>
        </a>
      </Link>
      <p>{postData.frontMatter?.abstract}</p>
      <small>
        <span>
          Published:{' '}
          <Date
            dateTime={postData.frontMatter?.published.dateTime}
            display={postData.frontMatter?.published.display}
          />
        </span>
        <span>
          Updated:{' '}
          <Date
            dateTime={postData.frontMatter?.updated.dateTime}
            display={postData.frontMatter?.updated.display}
          />
        </span>
      </small>
    </article>
  )
}

export default PostCard
