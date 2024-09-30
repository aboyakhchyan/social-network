import { BASE_URL } from "../../lib/constant"
import { IPost } from "../../lib/types"

interface IProps {
    posts: IPost[] | undefined
}

export const Gallery:React.FC<IProps> = ({posts}) => {
    
    return (
        <>
            <div className="list">
                {
                    posts?.map(post => 
                        <div key={post.id}>
                            <img 
                                src={BASE_URL + post.picture}
                             />
                             <p>{post.title}</p>
                        </div>
                    )
                }
            </div>
        </>
    )
}