import {Component, ReactNode} from "react";

interface IErrorBoundaryProps {
    children: ReactNode;
}

interface IErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Custom Error: ', error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <span className="custom-error-message">Error boundary triggered</span>
                    <button className="form__button _error" onClick={() => this.setState({ hasError: false })}>Return</button>
                </>
            )
        }

        return this.props.children;
    }
}
