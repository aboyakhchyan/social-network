import { useEffect, useRef, useState } from "react"
import { handleGetPosts, handlePostCreation } from "../../../lib/api"
import { IPost } from "../../../lib/types"
import { Gallery } from "../../../components/Gallery/Gallery"

export const Posts = () => {

    const [list, setList]= useState<IPost[]>([])
    const [text, setText] = useState<string>('')

    const photo = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        handleGetPosts()
        .then(response => {
            setList(response.payload as IPost[])
        })
    }, [])

    const handleUpload = (): void => {
        if(photo.current) {
            const file = photo.current.files?.[0]

            if(file) {
                const form = new FormData()
                form.append('photo', file)
                form.append('content', text)

                handlePostCreation(form)
                .then(response => {
                    setList([...list, response.payload as IPost])
                    setText('')
                })
            }
        }
    }


    return (
        <div className="gradient-custom-2 posts">
            <div className="list-posts">
            <h2>Posts</h2>

            <div>
                    <input 
                        type="file"
                        style={{display: 'none'}}
                        ref={photo}
                        onChange={handleUpload}
                        />

                    <input 
                        type="text"
                        className="form-control"
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={event => setText(event.target.value)}
                    />

                    <button 
                        className="btn btn-outline-success"
                        onClick={() => photo.current?.click()}
                        >Upload</button>
            </div>

                <Gallery posts={list}/>
            </div>
        </div>
    )
}