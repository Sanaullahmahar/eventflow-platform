import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProviders } from "@/app/providers/AppProviders";
import { AppRouteRegistry } from "@/app/routing/AppRouteRegistry";

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <Routes>
        {AppRouteRegistry.getRoutes().map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  </AppProviders>
);

export default App;
