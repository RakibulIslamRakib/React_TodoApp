import React ,{useState,useEffect} from 'react';
import Post from './Post.js';
import Search from './Search.js';
import {useForm} from 'react-hook-form';
import './GlobalVariables';

const Posts = ()=>{
  const [posts,setPosts] = useState([]);
  const [addPostShow,setAddPostShow] = useState(false);
  const {handleSubmit,register} = useForm();
  const usersId = [1,2,3,4,5,6,7,8,9,10]

  useEffect(()=>{
    fetch(global.postsUrl)
    .then((response) => response.json())
    .then((json) => {
      setPosts(json);
    })
    .catch(err=>{
      alert(`${err.name} occurs! Check your internet connection`)
    })
  },[]);


  const addPostForm = ()=>{
    setAddPostShow(!addPostShow);
  }

  const addNewPost = (addFormData)=>{
    addFormData.userId = parseInt(addFormData.userId)
    setAddPostShow(!addPostShow)
    fetch(global.postsUrl, {
    method: 'POST',
    body: JSON.stringify({
    title: addFormData.title,
    body: addFormData.body,
    userId: addFormData.userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((newPostObj) => {
      setPosts([...posts,newPostObj]);
      alert('Post Added Successfully')
    })
    .catch(err=>{
      alert(`${err.name} occurs! Try Again latter`)
    })
    }

   return (
    <>
      <div className='flex-auto h-auto content-center md:ml-24 lg:ml-72 
        md:px-32 py-2 items-center md:w-200'>
        <button onClick={addPostForm} className='bg-white ml-24 hover:bg-blue-100 
          rounded-md my-2 p-1'>Add Post</button>
        <Search posts={posts} updatePosts = {newPosts=>setPosts(newPosts)}/>   
      </div>

          { (addPostShow === true)
            ?
            (
              <div className='max-w-md my-auto bg-white md:ml-24 lg:ml-72 content-center 
                rounded-xl shadow-md overflow-hidden md:max-w-2xl my-2'>
                <div  className='max-w-md mx-auto bg-white  rounded-xl 
                shadow-md overflow-hidden md:max-w-2xl my-2'>
                  <h1 className='ml-12'>Add New Post:</h1>
                  <form onSubmit={handleSubmit(addNewPost)}>
                    <input {...register('title')} type='text' defaultValue='' 
                    placeholder='Post Title' className="px-2 py-2 border-2 h-14  
                    rounded-xl shadow-md m-4 w-11/12"/>
                    <label className="px-14 py-2">User Id :
                      <select {...register('userId')} className = 'h-auto m-2 p-1 bg-white text-center'>
                        {usersId.map(id=>{
                         return <option value={id} key={id}>User Id :{id}</option>
                      })}
                      </select>
                    </label>
                    
                    <textarea {...register('body')} type='text' defaultValue=''
                    placeholder='Post Content' className=" px-2 py-2 text-justify 
                    border-2 rounded-xl w-11/12 shadow-md m-4 h-48"></textarea><br/>
                    <input type='Submit' className="float-right mb-4 mr-24 border-0
                     rounded-xl p-1 bg-white hover:bg-blue-500"/>
                  </form>
                </div>
              </div>         
            )
            :
            ''
          }

       {posts.map(post=>{
          return <Post post={post} key={post.id}/>;
       })}
    </>     
  );
}

export default Posts;
