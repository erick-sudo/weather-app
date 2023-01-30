import React from "react";

import{ Blogs } from "../components/blogs/Blogs"
import FavoriteLocation from "./FavoriteLocation";

function Home({pos, blogs, curr, addLike, deleteBlog, setBlogs, postComment}) {

  function showBlogForm() {
    const postform = document.querySelector(".post-form")
    postform.classList.add("zoom-out")
    postform.classList.remove("zoom-in")
    postform.style.display = "block"
  }

    return (
    <div className="center home">
        <div className="current-location-stats">
          <FavoriteLocation curr={curr} pos={pos} />
        </div>
        <div className="content">
            <div className="left">
                <h1 className="welcome-text">Wherever you go, no matter what the weather, always bring your own sunshine.</h1>
                <h2 className="welcome-text">Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating; there is really no such thing as bad weather, only different kinds of good weather.</h2>
                <h3 className="welcome-text">Climate is what we expect, weather is what we get.</h3>
            </div>
            <div className="weather-updates">
                <div className="blog" onClick={showBlogForm}>POST 📯</div>
                <Blogs blogs={blogs} showBlogForm={showBlogForm} deleteBlog={deleteBlog} setBlogs={setBlogs} postComment={postComment} addLike={addLike}/>
            </div>
        </div>
    </div>
    )
}

export default Home;