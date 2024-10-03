import { useState } from "react"
import { handlePostReaction } from "../../lib/api"
import { BASE_URL, LIKE_BTN, NOT_LIKE_BTN } from "../../lib/constant"
import { IPost } from "../../lib/types"
import { Post } from "../Post/post"

interface IProps {
    posts: IPost[] | undefined
    onChangePostStatus?:(id: number) => void
}

export const Gallery:React.FC<IProps> = ({posts, onChangePostStatus}) => {

    const [currentPost, setCurrentPost] = useState<number>(-1)

    const reactPost = (id: number): void => {
        handlePostReaction(id)
        .then(() => {
            if(onChangePostStatus) {
                onChangePostStatus(id)
            }
        })
    }

    
    return (
        <>
            <div className="list">
                {
                    posts?.map(post => 
                        <div key={post.id} className="post">
                            <img 
                                src={BASE_URL + post.picture}
                                className="post-img"
                             />
                            <div onClick={()=> setCurrentPost(post.id)} className="cover"></div>
                             <img 
                                onClick={() => reactPost(post.id)}
                                className="like-btn"
                                src={
                                    post.isLiked ?
                                    LIKE_BTN :
                                    NOT_LIKE_BTN
                                }
                             />
                            <strong>{post.title}</strong>
                            <p><small>{post.likes.length} likes</small></p>
                        </div>
                    )
                }
            </div>

            {currentPost != -1 && <Post 
                                        postId={currentPost} 
                                        handleClose={() => setCurrentPost(-1)}
                                    />}
        </>
    )
}