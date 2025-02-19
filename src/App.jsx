import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BookContext } from "./context/BookContext";
import { ThemeContext, useMode } from "./context/Theme";
import "./i18n/i18n";
import { store } from "./redux/Store";
import { Routes } from "./routes/Routes";

export const App = () => {
  const [theme, setTheme] = useMode();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {/* <SocketProvider> */}
      <Provider store={store}>
        <ThemeContext.Provider value={setTheme}>
          <ThemeProvider theme={theme}>
            <BookContext>
              <CssBaseline />
              <Routes />
            </BookContext>
          </ThemeProvider>
        </ThemeContext.Provider>
      </Provider>
      {/* </SocketProvider> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </QueryClientProvider>
  );
};
