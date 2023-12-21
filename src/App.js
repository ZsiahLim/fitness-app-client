import MyRouter from './router/routers'
import { IntlProvider } from "react-intl";
import { localeConfig } from '../src/locale'
import { ConfigProvider, theme } from 'antd';
import antd_enUS from 'antd/locale/en_US';
import antd_zhCN from 'antd/locale/zh_CN';
import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/zh-cn';
import { zhCN } from '@mui/material/locale';
import useUserTheme from './hooks/useUserTheme';
import useUserLocale from './hooks/useUserLocale';

function App() {
  const currentTheme = useUserTheme()
  const Language = useUserLocale()
  const muiTheme = Language === 'en' ? createTheme({ palette: { mode: currentTheme, } }, zhCN) : createTheme({ palette: { mode: currentTheme, } }, zhCN)

  return (
    <ConfigProvider locale={Language === 'en' ? antd_enUS : antd_zhCN} theme={{ algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
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
