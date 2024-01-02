import { Empty } from 'antd'
import { useIntl } from 'react-intl'

export default function EmptyBlog() {
    const intl = useIntl()
    return (
        <div style={{ marginTop: "100px" }}>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 180 }}
                description={
                    <span>
                        {intl.formatMessage({id: 'app.blog.msg.noBlogs'})}
                    </span>
                }
            >
            </Empty>
        </div>
    )
}
