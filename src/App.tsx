import { ConfigProvider } from "antd";
import "./App.css";
import AppRoute from "./configs/AppRoute";
import "./index.css";
import { useLocation } from "react-router";
import { useLayoutEffect } from "react";

function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00A8A4",
          colorText: "#0D0F35",
          colorTextSecondary: "#71738B",
          colorError: "#EF4444",
          fontSize: 16,
          borderRadius: 4,
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        components: {
          Input: {
            colorBgContainer: "#F4F4F6",
            colorBorder: "#DDDDE3",
            borderRadius: 4,
          },
        },
      }}
    >
      <AppRoute />
    </ConfigProvider>
  );
}

export default App;
