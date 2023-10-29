import { Link } from 'react-router-dom';
import {Component} from "react";

export default class NotFound extends Component<{}, {}>{
    render() {
        return (
            <>
                <h1>Not Found</h1>
                <Link to="/">Go Home</Link>
            </>
        );
    }
}
