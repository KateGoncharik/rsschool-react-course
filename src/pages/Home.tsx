import {Search} from "../components/Search";
import {Component} from "react";
import {ItemsList} from "../components/ItemsList";
import {Technology, TechnologyResponse} from "../models/Technology.model";

interface HomeState {
    items: Technology[];
}

export default class Home extends Component<unknown, HomeState> {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    handleSearch(searchValue: string): void {
        // console.log(event);

        fetch("https://stapi.co/api/v2/rest/technology/search?pageNumber=0&pageSize=10")
            .then((data: Response) => data.json())
            .then((data: TechnologyResponse) => {
                console.log(data);
                this.setState({ items: data.technology });
            });
    }

    render() {
        return (
            <>
                <Search updateItemsCallback={this.handleSearch.bind(this)}/>
                <ItemsList items={this.state.items}/>
            </>
        );
    }
}
