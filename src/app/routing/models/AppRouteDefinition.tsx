import type { ReactElement } from "react";

export class AppRouteDefinition {
  public constructor(
    public readonly path: string,
    public readonly element: ReactElement,
  ) {}
}
