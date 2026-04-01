import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        <section className="empty-state">
          Произошла ошибка. Обновите страницу или попробуйте позже.
        </section>
      );
    }
    return this.props.children;
  }
}
