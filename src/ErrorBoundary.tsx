import { Component, PropsWithChildren } from "react";
import { ErrorDetail } from "@/components/Error/ErrorDetail";

interface State {
  error: unknown | null;
}

export class ErrorBoundary extends Component<
  PropsWithChildren<unknown>,
  State
> {
  constructor(props: PropsWithChildren<unknown>) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: unknown): State {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  render() {
    if (this.state.error) {
      return <ErrorDetail error={this.state.error} />;
    }

    return this.props.children;
  }
}
