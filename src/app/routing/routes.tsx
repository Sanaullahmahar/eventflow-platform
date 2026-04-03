import { AppRouteDefinition } from "@/app/routing/models/AppRouteDefinition";
import EventsInsurancePage from "@/pages/events-insurance/EventsInsurancePage";
import HomePage from "@/pages/home/HomePage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";

export const appRoutes = [
  new AppRouteDefinition("/", <HomePage />),
  new AppRouteDefinition("/events-insurance", <EventsInsurancePage />),
  new AppRouteDefinition("*", <NotFoundPage />),
];
