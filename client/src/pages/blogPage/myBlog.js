import React, { useEffect, useState } from 'react'
import Blog from './blog';
import imgPath from '../../Pic/workoutPlan.jpg'
import imgPath1 from '../../Pic/tutorial.webp'
import imgPath2 from '../../Pic/game.webp'
import imgPath3 from '../../Pic/contact2.avif'
import imgPath4 from '../../Pic/contact.webp'
import jay from '../../Pic/jay.jpg'
import test1 from '../../Pic/test1.jpg'
import axios from 'axios';
export default function MyBlog() {
    const [myBlogs, setMyBlogs] = useState([])
    const [column1, setColumn1] = useState([])
    const [column2, setColumn2] = useState([])
    const [column3, setColumn3] = useState([])
    const [column4, setColumn4] = useState([])
    useEffect(() => {
        const getData = async () => {
            await axios.get('http://localhost:3001/api/blogs/getmyblog', { withCredentials: true }).then((res) => {
                setMyBlogs(res.data)
            })
        }
        getData()
    }, [])
    useEffect(() => {
        let forColumn1 = []
        let forColumn2 = []
        let forColumn3 = []
        let forColumn4 = []
        if (myBlogs) {
            myBlogs.map((blog, i) => {
                let index = i % 4
                console.log(index);
                switch (index) {
                    case 0:
                        forColumn1.push(blog)
                        setColumn1(forColumn1)
                        break;
                    case 1:
                        forColumn2.push(blog)
                        setColumn2(forColumn2)
                        break;
                    case 2:
                        forColumn3.push(blog)
                        setColumn3(forColumn3)
                        break;
                    case 3:
                        forColumn4.push(blog)
                        setColumn4(forColumn4)
                        break;
                    default:
                        break;
                }
            })
        }
        console.log(column1);
        console.log(column2);
        console.log(column3);
        console.log(column4);
    }, [myBlogs])
    return (
        <div className='blog-content'>
            <div class="row">
                <div class="column">
                    {column1.map((blog) => <Blog blogInfo={{ imgUrl: blog.imgUrl[0], title: blog.title, likesUsers: blog.likesUsers }} />)}
                </div>

                <div class="column">
                    {column2.map(({ imgUrl, title, likesUsers }) => <Blog blogInfo={{ imgUrl: imgUrl[0], title, likesUsers }} />)}
                </div>

                <div class="column">
                    {column3.map(({ imgUrl, title, likesUsers }) => <Blog blogInfo={{ imgUrl: imgUrl[0], title, likesUsers }} />)}
                </div>
                <div class="column">
                    {column4.map(({ imgUrl, title, likesUsers }) => <Blog blogInfo={{ imgUrl: imgUrl[0], title, likesUsers }} />)}
                </div>
            </div>
        </div>
    )
}
