import React, { useEffect, useState } from 'react'
import Blog from './components/blog';
import axios from 'axios';
import { Button, Empty } from 'antd';
export default function Blog(props) {
    
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
    }, [myBlogs])
    return (
        <div className='blog-content'>
            {
                (column1.length === 0 && column2.length === 0 && column3.length === 0 && column4.length === 0) &&
                <div className='empty'>
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{ height: 120 }}
                        description={
                            <span>
                                No blogs right now
                            </span>
                        }
                    >
                        <Button type="primary">Create Now</Button>
                    </Empty>
                </div>
            }
            <div class="row">
                <div class="column">
                    {column1.map((blog) => <Blog blogInfo={blog} />)}
                </div>

                <div class="column">
                    {column2.map((blog) => <Blog blogInfo={blog} />)}
                </div>

                <div class="column">
                    {column3.map((blog) => <Blog blogInfo={blog} />)}
                </div>
                <div class="column">
                    {column4.map((blog) => <Blog blogInfo={blog} />)}
                </div>
            </div>
        </div>
    )
}
