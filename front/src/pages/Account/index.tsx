import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { handleGetAccount } from "../../lib/api"
import { IAccount } from "../../lib/types"
import { BASE_URL, DEFAULT_PIC, IS_PRIVATE } from "../../lib/constant"
import { Gallery } from "../../components/Gallery/Gallery"

export const Account = () => {

    const [account, setAccount] = useState<IAccount | null>(null)

    const navigate= useNavigate()

    const {id} = useParams()

    useEffect(() => {
        handleGetAccount(id)
        .then(response => {
            if(response.status == 'ok') {
                setAccount(response.payload as IAccount)
            }else {
                navigate('/profile')
            }
        })  
    }, [])

    return (
        <div className="gradient-custom-2 account">
            <div className="list-account">

                <div 
                    className="account-profile"
                    style={{
                        backgroundImage: `url(${account?.cover ?
                            BASE_URL + account.cover : ''
                        })`,
                    }}
                    >
                    <img 
                        src={!account?.picture ? DEFAULT_PIC : BASE_URL + account?.picture}
                        style={{width: 250, height: 250}}
                    />

                    <div>
                        <h3>{account?.name}</h3>
                        <h3>{account?.surname}</h3>
                    </div>
                </div>
                
                <div>   
                    {
                        account?.isPrivate ? (
                        <>
                            <img 
                                src={IS_PRIVATE}
                                style={{width: 200, height: 200}}
                            />
                            <h5>Account is private</h5>
                        </>
                        )
                        : (
                            <>
                                {account?.posts.length !== 0 ?
                                 <h2 className="text-posts">Posts</h2>
                                : <h2 className="text-posts">Post does not exist</h2>
                                }
                                <Gallery posts={account?.posts} />
                            </>
                        )
                    } 
                </div>
            </div>
        </div>
    )
}