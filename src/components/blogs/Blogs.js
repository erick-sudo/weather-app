import React, {useState} from "react"
import "./Blogs.css"
import telegram from "../../assets/iconsHv/telegram.png"
import arrowLeft from "../../assets/iconsHv/x-mark.png"
import arrowup from "../../assets/iconsFg/arrow-up.png"
import arrowdown from "../../assets/iconsFg/arrow-down.png"

function Blogs({blogs, setBlogs, postComment}) {

    function updateBlogs(blog) {
        setBlogs([blog, ...blogs])
    }

    return (
        <div className="blogs-wrapper">
            <h2>Blogs</h2>
            <PostForm send={telegram} updateBlogs={updateBlogs} />
            <div className="blogs">
                {
                    blogs.map(blog => {
                      return <Post key={blog.id} postComment={postComment} blogpost={blog}/>  
                    })
                }
            </div>
        </div>
    );
}

function PostForm({send, updateBlogs}) {
    function hideBlogForm() {
        const postform = document.querySelector(".post-form")
        postform.classList.add("zoom-in")
        postform.classList.remove("zoom-out")
        postform.style.display = "none"
    }

    return (
        <div className="post-form">
            <div className="hide-poster" onClick={hideBlogForm}><img src={arrowLeft} alt="close poster" /></div>
            <h2>Conversation is king. Content is just something to talk about.</h2>
            <form className="form-post" onSubmit={(event) => {
                event.preventDefault()

                const newBlog = {
                    title: event.target.title.value,
                    author: event.target.firstname.value + " " + event.target.lastname.value,
                    url: "http://",
                    date: new Date().toString(),
                    description: event.target.bloginfo.value,
                    image: event.target.image.value,
                    comments: []
                }

                fetch("https://cire-portfolio.herokuapp.com/blogs",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(newBlog)
                })
                .then(response => response.json())
                .then(data => {
                    updateBlogs(data)
                })

                event.target.reset()
                hideBlogForm()
            }}>
                <input name="title" type="text" placeholder="Title" required />
                <input name="firstname" type="text" placeholder="Firstname" required/>
                <input name="lastname" type="text" placeholder="Lastname" required/>
                <input name="email" type="text" required  placeholder="Email"/>
                <input name="image" type="url" placeholder="Image url"/>
                <textarea className="blog-info" name="bloginfo" placeholder="About" required></textarea>
                <button className="post-btn"><img src={send} alt="post" /></button>
            </form>
        </div>
    );
}


function Post({blogpost: {id, author, date, image, description, comments, title}, postComment}) {

    const [collapse, setcollapse] = useState(true);

    return (
        <div className="posts">
            <h1 className="post-heading">{title}</h1>
            <span className="time">{date}</span>
            <h3 className="author">#{author}</h3>
            <div className="post-content">
                <Pic url={image} />
                <p className="about-post">{description}</p>
            </div>
            <section className="comments">
                <div className="expand-comments" onClick={() => {
                    setcollapse(!collapse)
                }}><img src={ collapse ? arrowup : arrowdown} alt="collapse comments"/></div>
                <h5 className="h5" >Comments</h5>
                {
                    collapse ? null : comments.map((comment) => {
                        return <Comment key={comment.id} comment={comment} />
                    })
                }
            </section>
            <CommentForm postId={id} send={telegram} postComment={postComment}/>
        </div>
    );
}

function Pic({url}) {
    return (
        <div className="pics">
            <img className="pictures" src={url} alt="post-pic" />
        </div>
    );
}

function Comment({comment: {name, email, body}}) {
    return (
            <fieldset className="comment">
                <legend className="comment-legend">
                    <img className="comment-avatar" src="https://cdn.pixabay.com/photo/2018/08/26/16/23/atm-3632623_960_720.png" alt={email} />
                    <span className="email-commment">{name}</span>
                </legend>
                <div className="comment-body">{body}</div>
                <div className="comment-email"><a href={`mailto:${email}`}>{email}</a></div>
            </fieldset>
    );
}

function CommentForm({send, postId, postComment}) {
    return (
        <div className="comment-form">
            <div className="message-icon"><img src="https://cdn.pixabay.com/photo/2017/03/17/06/47/email-2151046_960_720.png"  alt="message"/></div>
            <form onSubmit={(event) => {
                event.preventDefault();
                
                const newComment = {
                    name: event.target.email.value.slice(0,5)+"...",
                    email: event.target.email.value,
                    body: event.target.body.value
                }

                postComment(postId, newComment)
                event.target.reset()       
            }}>
                <textarea className="write-comment" name="body" ></textarea>
                <div className="comment-author">
                    <input className="email" name="email" type="email"/>
                    <button className="comment-btn"><img src={send} alt="comment" /></button>
                </div>
            </form>
        </div>
    );
}

export default Blogs