import { ConfigProvider } from "antd";

const AntProvider = ({ children }) => {

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#F05247'
      },
      components: {
        Input: {
          lineHeight: '40px'
        },
        Tag: {
          colorBgContainer:'#4e1e9330',
          colorBorder: '#4e1e9370',
          colorText: '#4e1e93',
        }
      }
    }}>
      {children}
    </ConfigProvider>
  );
}

export default AntProvider;

