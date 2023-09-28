import MyRouter from './router/routers'
import { IntlProvider } from "react-intl";
import { localeConfig } from '../src/locale'
import { useSelector } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  const { currentTheme, userLocale } = useSelector((state) => state.user)
  const darkTheme = createTheme({ palette: { mode: 'dark', }, });
  const Language = userLocale ? userLocale.substring(0, 2) : navigator.language.substring(0, 2)

  return (
    <ConfigProvider locale={Language === 'en' ? enUS : zhCN} theme={currentTheme === 'dark' ? { algorithm: theme.darkAlgorithm, } : { algorithm: theme.defaultAlgorithm, }}>
      <IntlProvider locale={Language} messages={localeConfig[Language]}>
        <ThemeProvider theme={currentTheme === 'dark' && darkTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MyRouter />
          </LocalizationProvider>
        </ThemeProvider>
      </IntlProvider>
    </ConfigProvider>
  );
}

export default App;
