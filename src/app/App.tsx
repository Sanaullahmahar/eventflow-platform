import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProviders } from "@/app/providers/AppProviders";
import { appRoutes } from "@/app/routing/routes";

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <Routes>
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  </AppProviders>
);

export default App;
