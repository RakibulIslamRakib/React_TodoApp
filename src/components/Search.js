import {useCallback,useState,useEffect} from 'react';
import './GlobalVariables';

function GetPostsData(props) {

  const handleChange = (value)=>{
    fetch(global.postsUrl)
    .then((response) => response.json())
    .then((posts) => {
      let newPosts = posts.filter(function(post){
        return (post.title.toLowerCase().indexOf(value.toLowerCase())) >-1 });
      props.updatePosts(newPosts)
    })
    .catch(err=>{
      alert(`${err.name} occurs! Check your internet connection`)
    })
  }

  const debounce = (func)=>{
    let timer;
    return function(...args){
      const context = this;
      if(timer)clearTimeout(timer);
      timer = setTimeout(()=>{
        timer=null;
        func.apply(context,args);
      },500);
    }
  }

  const optimizedFn = useCallback(debounce(handleChange),[]);

  return (
    <input  type='text' onChange={(e)=>optimizedFn(e.target.value)} 
      placeholder='Search Todo' 
      className="px-2 py-1 border-2 h-12  rounded-xl shadow-sm m-1 w-5/12"/>
  );
}

export default GetPostsData;
