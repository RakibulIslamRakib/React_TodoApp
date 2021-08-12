import React ,{useState,useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {postsApiBaseUrl} from 'utils/utilVar.js';

const Post = (props)=>{
  const [post,setPost] = useState({});
  const [editPostShow,setEditPostShow] = useState(false);
  const {handleSubmit,register} = useForm();

  useEffect(()=>{
    setPost(props.post);
  },[]);

  const deletPost = (e)=>{
      if(window.confirm('Are you Sure?')){
        fetch(`${postsApiBaseUrl}/${post.id}`, {
          method: 'DELETE',
        })
        .then(()=>{
            e.target.parentNode.remove();
        })
        .catch((err)=>{
          alert(`ops! ${err.name} occurs`)
        })
      }
  }

  const editPost = (editFormData)=>{
    setEditPostShow(!editPostShow)
    fetch(`${postsApiBaseUrl}/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify({
    id: post.id,
    title: editFormData.title,
    body: editFormData.body,
    userId: post.userId,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((updatedPost) => {
    setPost(updatedPost)
    alert('Successfully updated')
  })
  .catch(err=>{
      setEditPostShow(!editPostShow);
      alert(`${err} occurs! Try Again latter`)
  })
  }

  const editPostForm = ()=>{
    setEditPostShow(!editPostShow);
  }


   return (

    <div className='flex-auto h-auto content-center md:px-32 py-2 items-center md:w-200'>

      {
        (editPostShow === false)

        ? (<div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-2'>
            <h3 className='text-center font-bold pt-4'>{post.title}</h3>
            <div className="flex justify-center pb-4">
              <h3 className="px-4"><small>@Author :</small> Rakib</h3>  
              <h3 className="px-4"><small>Post Id:</small> {post.id}</h3>
            </div>
            <p className="px-2 text-justify">{post.body}</p>
            <button className="border-none float-right mr-8 my-4 hover:text-red-500 rounded-xl" onClick={deletPost}>Delet</button>
            <button className="border-none float-right mr-4 my-4 hover:text-yellow-200 rounded-xl" onClick={editPostForm} >Edit</button>
          </div>)

          :
        
          (<div  className='max-w-md mx-auto bg-white text-center rounded-xl shadow-md overflow-hidden md:max-w-2xl my-2'>
            <h1>Update Post:</h1>
            <form onSubmit={handleSubmit(editPost)}>
              <input {...register('title')} type='text' defaultValue={post.title} className="px-2 py-2 border-2 h-14  rounded-xl shadow-md m-4 w-11/12"/>
              <textarea {...register('body')} type='text' defaultValue={post.body} className=" px-2 py-2 text-justify border-2 rounded-xl w-11/12 shadow-md m-4 h-48"></textarea><br/>
              <input type='Submit' className="float-right mb-4 mr-24 border-0 rounded-xl p-1 bg-white hover:bg-blue-500"/>
            </form>
          </div>)
        }
      
    </div>  
         
  );
}

export default Post;
