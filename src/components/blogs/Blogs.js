import React, {useState, useEffect, useRef} from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Blogs.css"
import telegram from "../../assets/iconsHv/telegram.png"
import arrowLeft from "../../assets/iconsHv/x-mark.png"
import arrowup from "../../assets/iconsFg/arrow-up.png"
import arrowdown from "../../assets/iconsFg/arrow-down.png"

import aigenerated from "../../assets/profilepics/ai-generated.jpg"
import goddess from "../../assets/profilepics/goddess.jpg"
import skeleton from "../../assets/profilepics/skeleton.svg"
import teacher from "../../assets/profilepics/teacher.svg"

function Blogs({blogs, deleteBlog, setBlogs, postComment, addLike}) {

    function updateBlogs(blog) {
        setBlogs(blog)
    }


    return (
        <div className="blogs-wrapper">
            <h3>Updates</h3>
            <PostForm send={telegram} updateBlogs={updateBlogs} />
            <div className="blogs">
                {
                    blogs.map(blog => {
                      return <Post key={blog.id} owner="Blogs" deleteBlog={deleteBlog} postComment={postComment} addLike={addLike} blogpost={blog}/>  
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

                fetch("http://localhost:8001/blogs",{
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
                <textarea 
                className="blog-info" name="bloginfo" placeholder="About" required></textarea>
                <button className="post-btn"><img src={send} alt="post" /></button>
            </form>
        </div>
    );
}

function ViewPost({addLike, deleteBlog, postComment}) {

    const navigate = useNavigate()

    const {blogId} = useParams()

    const [post, setPost] = useState(null)

    function updateLikes(id) {
        const newLikedPost = post
        newLikedPost.comments.forEach(comm => {
            if(comm.id === id) {
                comm.likes+=1
            }
        })
        setPost(newLikedPost)
    }

    function addFrontComment(newComment) {
        const newCommentedPost = post
        const len = post.comments.length
        newCommentedPost.comments.push({...newComment, id: len})
        setPost(newCommentedPost)
    }

    useEffect(() => {
        fetch(`http://localhost:8001/blogs/${blogId}`)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length < 1) {
                navigate("*")
            } else {
                setPost(data)
            }
        })
    }, [])

    return (
        <div className="post-preview">
            {post ? <Post addLike={addLike} deleteBlog={deleteBlog} postComment={postComment} blogpost={post} updateLikes={updateLikes} addFrontComment={addFrontComment}/> : null}
        </div>
    )
}

function UpdateBlog() {

    const { blogId } = useParams()
    const navigate = useNavigate()

    const [blog, setBlog] = useState({
        title : "",
        image: "",
        description: ""
    })

    function handleChange(event) {
        setBlog({...blog, [event.target.name] : event.target.value})
    }

    function handleUpdate(event) {
        event.preventDefault()

        fetch(`http://localhost:8001/blogs/${blogId}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(blog)
        })
        .then(response => response.json())
        .then(data => {
            navigate(`/viewpost/${blogId}`)
        })
    }

    useEffect(() => {
        fetch(`http://localhost:8001/blogs/${blogId}`)
        .then(res => res.json())
        .then(data => setBlog(data))
    }, [])

    return (
        <form className="update-form" onSubmit={handleUpdate}>
            <div className="update-blog-form">
                <div className="Blog-Details">
                    <div className="field">
                        <label>Title</label>
                        <input type="text" onChange={handleChange} name="title" value={blog.title ? blog.title : ""} />
                    </div>
                    <div className="field">
                        <label>Author</label>
                        <input type="text" name="author" value={blog.author ? blog.author : ""} readOnly disabled/>
                    </div>
                    <div className="field">
                        <label>Last Updated</label>
                        <input type="text" name="date" value={blog.date ? blog.date : ""} readOnly disabled/>
                    </div>
                    <div className="field">
                        <label>Image Url</label>
                        <input type="url" name="image" onChange={handleChange} value={blog.image ? blog.image : ""} />
                    </div>
                    <div className="field">
                        <p>💬 Comments : {blog.comments ? blog.comments.length : ""}</p>
                    </div>
                </div>
                <div className="blog-description">
                    {blog.image ? <img src={blog.image} alt={blog.title} /> : null}
                    <button className="update-blog-btn">Update</button>
                </div>
            </div>
            <textarea onChange={handleChange} name="description" value={blog.description ? blog.description : ""}></textarea>
        </form>
    )
}

function Post({blogpost: {id, author, date, image, description, comments, title}, postComment, addLike, deleteBlog, owner, updateLikes, addFrontComment}) {

    const [collapse, setcollapse] = useState(true);

    const postRef = useRef()

    const navigate = useNavigate()

    return (
            <div ref={postRef} className="posts" onClick={(event) => {
                if(owner) {
                    navigate(`/viewpost/${id}`)
                }   
            }}>
            <div className="flex-image-and-headings">
                {collapse ? null : <div className="top-headings">
                <h1 className="post-heading">{title}</h1>
                <span className="time">{date}</span>
                <h4 className="author">#{author}</h4>
                </div>}
                <div className="post-content">
                    <Pic url={image} blogid={id} deleteBlog={deleteBlog} />
                    <p className="about-post">{description}</p>
                </div>
            </div>
            <div className="expand-comments" onClick={() => {
                        setcollapse(!collapse)
                    }}><img src={ collapse ? arrowup : arrowdown} alt="collapse comments"/></div>
            {collapse && owner ? null : <>
            <section className="comments">
                
                <h5 className="h5" >Comments</h5>
                <div className="flex-comments">
                {
                    comments.map((comment) => {
                        return <Comment key={comment.id} comment={comment} blogId={id} addLike={addLike} updateLikes={updateLikes} />
                    })
                }
                </div>
            </section>
            <CommentForm postId={id} send={telegram} postComment={postComment} addFrontComment={addFrontComment}/>
            </>}
        </div>
    );
}

function Pic({url, blogid, deleteBlog}) {
    const navigate = useNavigate()
    return (
        <div className="pics">
            <button className="deleteblog" onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                deleteBlog(blogid);
                navigate(`/home`);
            }}>Delete</button>
            <img className="pictures" src={url} alt="post-pic" />
            <button className="updateblog" onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                navigate(`/updateblog/${blogid}`);
            }}>Update</button>
        </div>
    );
}

function Comment({comment, blogId, addLike, updateLikes}) {
    const {id, name, email, body, likes} = comment;
    const profilepics = [aigenerated, goddess, skeleton, teacher]

    return (
            <fieldset className="comment">
                <legend className="comment-legend">
                    <img className="comment-avatar" src={profilepics[getRandomInteger()]} alt={email} />
                    <span className="email-commment">{name}</span>
                </legend>
                <div className="comment-body">{body}</div>
                <div className="comment-email"><a href={`mailto:${email}`}>{email}</a></div>
                <button onClick={() => {
                    updateLikes(id)
                    addLike(blogId, id)
                }} className="likes">{likes} Likes 👍 </button>
            </fieldset>
    );
}

function getRandomInteger() {
    return Math.floor(Math.random() * 10)%4;
}

function CommentForm({send, postId, postComment, addFrontComment}) {

    return (
        <div className="comment-form">
            <div className="message-icon"><img src="https://cdn.pixabay.com/photo/2017/03/17/06/47/email-2151046_960_720.png"  alt="message"/></div>
            <form onSubmit={(event) => {
                event.preventDefault();
                
                const newComment = {
                    name: event.target.email.value.slice(0,5)+"...",
                    email: event.target.email.value,
                    body: event.target.body.value,
                    likes: 0,
                }

                postComment(postId, newComment)
                if(addFrontComment) {
                    addFrontComment(newComment)
                }
                
                event.target.reset()       
            }}>
                <textarea className="write-comment" name="body" required></textarea>
                <div className="comment-author">
                    <input className="email" name="email" type="email" required/>
                    <button className="comment-btn"><img src={send} alt="comment" /></button>
                </div>
            </form>
        </div>
    );
}

export { Blogs, UpdateBlog, ViewPost }