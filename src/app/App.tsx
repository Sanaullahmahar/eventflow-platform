import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProviders } from "@/app/providers/AppProviders";
import { AppRouteRegistry } from "@/app/routing/AppRouteRegistry";

const App = () => (
  <AppProviders>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {AppRouteRegistry.getRoutes().map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  </AppProviders>
);

export default App;
