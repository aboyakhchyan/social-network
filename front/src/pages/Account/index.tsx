import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { handleCancelRequest, handleGetAccount, handleSendFollow, handleUnfollow } from "../../lib/api"
import { IAccount } from "../../lib/types"
import { BASE_URL, DEFAULT_PIC, IS_PRIVATE } from "../../lib/constant"
import { Gallery } from "../../components/Gallery/Gallery"

export const Account = () => {

    const {id} = useParams()

    const [account, setAccount] = useState<IAccount | null>(null)

    console.log(account)

    const navigate= useNavigate()

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

    const handleRequest = (): void => {
        if(account) {
            if(account.connection.following) {
                unfollowUser()
            }else if(account.connection.requested) {
                cancelRequest()
            }else {
                followUser()
            }
        }
    }

    const followUser = (): void => {
        if(account && account.id) {
            handleSendFollow(account.id)
            .then(response => {
                if(response.status == 'following') {
                    setAccount({
                        ...account,
                        connection: {...account.connection, following: true}
                    })
                }else if(response.status == 'requested') {
                    setAccount({
                        ...account,
                        connection: {...account.connection, requested: true}
                    })
                }
            })
        }
    }

    const unfollowUser = (): void => {
        if(account && account.id) {
            handleUnfollow(account.id)
            .then(response => {
                if(response.status == 'unfollowed') {
                    setAccount({
                        ...account,
                        connection: {...account.connection, following: false}
                    })
                }
            })
        }
    }

    const cancelRequest = (): void => {
        if(account && account.id) {
            handleCancelRequest(account.id)
            .then(response => {
                if(response.status == 'cancelled') {
                    setAccount({
                        ...account,
                        connection: {...account.connection, requested: false}
                    })
                }
            })
        }
    }

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

                    <button 
                        className="btn btn-primary"
                        onClick={handleRequest}
                    >
                        {
                            account?.connection.following ?
                            'unfollow' :
                            account?.connection.requested ?
                            'cancel request' :
                            'follow'
                        }
                    </button>
                </div>
                
                <div>   
                    {
                        (account?.isPrivate && !account.connection.following) ? (
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