import {Component} from "react";

export interface IItemsListProps {
    items: unknown[];
}

export class ItemsList extends Component<IItemsListProps, unknown> {
    render() {
        return (
            <div className="list">
                {
                    this.props.items.map((item) => (
                        <div>{item.name}</div>
                    ))
                }
            </div>
        );
    }
}
