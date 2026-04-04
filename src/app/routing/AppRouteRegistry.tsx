import type { ReactElement } from "react";
import EventsInsurancePage from "@/pages/events-insurance/EventsInsurancePage";
import GetQuotePage from "@/pages/get-quote/GetQuotePage";
import HomePage from "@/pages/home/HomePage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import { AppRoutes } from "@/shared/routing/AppRoutes";

export class AppRouteRegistry {
  public static getRoutes(): ReadonlyArray<{ path: string; element: ReactElement }> {
    return [
      { path: AppRoutes.HOME, element: <HomePage /> },
      { path: AppRoutes.EVENTS_INSURANCE, element: <EventsInsurancePage /> },
      { path: AppRoutes.GET_QUOTE, element: <GetQuotePage /> },
      { path: AppRoutes.NOT_FOUND, element: <NotFoundPage /> },
    ];
  }
}
