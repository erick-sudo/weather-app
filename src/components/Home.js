import React, {useState, useEffect} from "react";

import rocket from "../assets/rocket-loop.gif"
import Blogs from "../components/blogs/Blogs"

function Home({pos}) {

    const {lat, lon} = pos
    const [blogs, setBlogs] = useState([]);

  function showBlogForm() {
    const postform = document.querySelector(".post-form")
    postform.classList.add("zoom-out")
    postform.classList.remove("zoom-in")
    postform.style.display = "block"
  }

  function addLike(blogId, commentId) {
    //
    const newBlog = blogs.find(blog => blog.id === blogId)
    if(newBlog) {
      newBlog.likes += 1

      let prevComments = newBlog.comments

      const newComment = prevComments.find(comment => comment.id === commentId)
      if(newComment) {
        newComment.likes += 1

        prevComments = prevComments.map(comment => {
          if(comment.id === commentId) {
            return newComment
          } else {
            return comment
          }
        })

        newBlog.comments = prevComments;

        fetch(`https://cire-portfolio.herokuapp.com/blogs/${blogId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(newBlog),
        })
        .then(response => response.json())
        .then(data => {

          setBlogs([...blogs].map(blog => {
            if(blog.id === data.id) {
              return data
            } else {
              return blog
            }
          }))
        })
      }
    }
  }

  function postComment(blogId, comment) {
    //
    const newBlog = blogs.find(blog => blog.id === blogId)
    if(newBlog) {
      comment.id = newBlog.comments.length+1
      newBlog.comments.unshift(comment)
      
      fetch(`https://cire-portfolio.herokuapp.com/blogs/${blogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    })
    .then(response => response.json())
    .then(data => {

      setBlogs([...blogs].map(blog => {
        if(blog.id === data.id) {
          return data
        } else {
          return blog
        }
      }))
    })

    }
  }

  useEffect(() => {
    fetch('https://cire-portfolio.herokuapp.com/blogs')
    .then(response => response.json())
    .then(data => setBlogs(data.reverse()))
    }, [])


    return (
    <div className="center home">
        {/* <div className="background-gif">
            <img src={rocket} alt="rocket-gif"/>
        </div> */}
        <div className="current-location">
          <h1>{lat +" "+lon}</h1>
        </div>
        <div className="content">
            <div className="left">
                <h1 className="welcome-text">Wherever you go, no matter what the weather, always bring your own sunshine.</h1>
                <h2 className="welcome-text">Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating; there is really no such thing as bad weather, only different kinds of good weather.</h2>
                <h3 className="welcome-text">Climate is what we expect, weather is what we get.</h3>
            </div>
            <div className="weather-updates">
                <div className="blog" onClick={showBlogForm}>POST 📯</div>
                <Blogs blogs={blogs} setBlogs={setBlogs} postComment={postComment} addLike={addLike}/>
            </div>
        </div>
    </div>
    )
}

export default Home;