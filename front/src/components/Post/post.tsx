import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { handleGetPostData } from '../../lib/api';
import { IPost } from '../../lib/types';
import { BASE_URL } from '../../lib/constant';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface IProps{
    postId: number
    handleClose:() => void
}


export function Post({postId, handleClose}: IProps) {

  const [postData, setPostData] = useState<IPost | null>(null)

  useEffect(() => {
    handleGetPostData(postId)
    .then(response => {
      setPostData(response.payload as IPost)
    })
  }, [])

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box 
            sx={style}
            style={{display: 'flex', gap: 20, position: 'relative'}}
        >
            <img 
                src={BASE_URL + postData?.picture}
                className='post-data-img'
            />

          <h4 className='post-title'>{postData?.title}</h4>  

            <div className='list-data-post'>
              <h5>List of liked</h5>
                {
                  postData?.likes.map(like => 
                      <div key={like.id}>
                          <p>{like.name} {like.surname}</p>
                      </div>
                  )
                }
            </div>
        </Box>
      </Modal>
    </div>
  );
}