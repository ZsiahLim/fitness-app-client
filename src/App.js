import MyRouter from './router/routers'
import { IntlProvider } from "react-intl";
import { localeConfig } from '../src/locale'
import { useSelector } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import antd_enUS from 'antd/locale/en_US';
import antd_zhCN from 'antd/locale/zh_CN';
import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/zh-cn';
import { zhCN } from '@mui/material/locale';//need to do

function App() {
  const { currentTheme, userLocale } = useSelector((state) => state.user)
  const Language = userLocale.substring(0, 2)
  console.log('lang', Language);
  const muiTheme = Language === 'en' ? createTheme({ palette: { mode: currentTheme, } }, zhCN) : createTheme({ palette: { mode: currentTheme, } }, zhCN)

  return (
    <ConfigProvider locale={Language === 'en' ? antd_enUS : antd_zhCN} theme={currentTheme === 'dark' ? { algorithm: theme.darkAlgorithm, } : { algorithm: theme.defaultAlgorithm, }}>
      <IntlProvider locale={Language} messages={localeConfig[Language]}>
        <ThemeProvider theme={muiTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={Language === 'zh' ? 'zh-cn' : 'en'}>
            <MyRouter />
          </LocalizationProvider>
        </ThemeProvider>
      </IntlProvider>
    </ConfigProvider>
  );
}

export default App;
