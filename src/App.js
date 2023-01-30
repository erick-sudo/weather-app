import React, {useState, useEffect} from "react";
import { Routes, Route, Navigate} from "react-router-dom"
import './App.css';
import Home from "./components/Home"
import Current from "./components/Current"
import Statistics from "./components/Statistics"
import About from "./components/About"
import Navigationbar from "./components/Navigationbar"
import Footer from "./components/Footer";
import { forecast as defaultData } from "./data/weatherdata";

import error from "./assets/error-404.png"
import { LoginForm, SignupForm } from "./components/Login";
import { UpdateBlog, ViewPost } from "./components/blogs/Blogs";

function PageNotFound({pageFound, setPageFound}) {
  return (
    <div className="error">
      <img src={error} alt="error" />
      <h1>Page not found</h1>
    </div>
  )
}

function App() {

  const [theme, setTheme] = useState("dark");
  const [currentLocation, setCurrentLocation] = useState({lat: -1, lon: 37});

  const [loggedIn, setLoggedIn] = useState(false)

  const [blogs, setBlogs] = useState([]);

  function updateBlogs(blog) {
    setBlogs([blog, ...blogs]);
  }

  useEffect(() => {
    fetch('http://localhost:8001/blogs')
    .then(response => response.json())
    .then(data => setBlogs(data.reverse()))
    }, [])

  function deleteBlog(id) {
    fetch(`http://localhost:8001/blogs/${id}`,{
      method: "DELETE"
    })

    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  function postComment(blogId, comment) {

    alert("Posting Comment"+comment)
    //
    const newBlog = blogs.find(blog => blog.id === blogId)
    if(newBlog) {
      comment.id = newBlog.comments.length+1
      newBlog.comments.unshift(comment)
      
      fetch(`http://localhost:8001/blogs/${blogId}`, {
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

        fetch(`http://localhost:8001/blogs/${blogId}`, {
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({lat: position.coords.latitude, lon: position.coords.longitude})
    })
  }, [])

  function toggleTheme(th) {
    setTheme(th)
  }
  
  return (
    <div className={theme}>
      <Navigationbar theme={theme} setLoggedIn={setLoggedIn} loggedIn={loggedIn} toggleTheme={toggleTheme} />
      <Routes>
        <Route index element={<Navigate replace to="/login" />} />
        <Route path="home" element={<Home blogs={blogs} addLike={addLike} deleteBlog={deleteBlog} postComment={postComment} pos={currentLocation} curr={defaultData} setBlogs={updateBlogs} />}/>
        <Route exact path="current" element={<Current pos={currentLocation} />} />
        <Route exact path="updateblog/:blogId" element={ <UpdateBlog />} />
        <Route exact path="viewpost/:blogId" element={ <ViewPost addLike={addLike} deleteBlog={deleteBlog} postComment={postComment} />} />
        <Route exact path="statistics" element={<Statistics pos={currentLocation} />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<LoginForm setLoggedIn={setLoggedIn} />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="error" element={<PageNotFound />} />
        <Route path="*" element={<Navigate replace to="error" />} />
      </Routes>
      {loggedIn ? <Footer /> : null}
    </div>
  );
}

export default App;
