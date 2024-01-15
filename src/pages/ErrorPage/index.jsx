import { useNavigate, useRouteError } from 'react-router-dom'
import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useIntl } from 'react-intl';

export default function ErrorPage({ errorMsg }) {
    const intl = useIntl()
    const error = useRouteError()
    const navigateTo = useNavigate()
    return <Result
        title={errorMsg ? errorMsg : 'Error'}
        extra={<Button type='primary' onClick={() => navigateTo('/')}>{intl.formatMessage({ id: 'error.btn.backHome' })} <CaretRightOutlined /></Button>}
    />
}
