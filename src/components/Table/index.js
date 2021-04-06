import React, { Component } from "react";
import API from "../../utils/API"
import Row from "../Row/index"
import Filter from "../Filter/index"

class Table extends Component {
    state = {
        results: [],
        firstNameFilter: "",
        filteredResults: [],
        sortCol: "first",
        sortAsc: true,
    };

    componentDidMount() {
        this.searchRandomEmp(50)
    }

    searchRandomEmp = query => {
        API.search(query)
            .then(res => {
                this.setState({
                    results: res.data.results.map(employee => {
                        return {
                            ...employee,
                            first: employee.name.first,
                            last: employee.name.last,
                            login: employee.login.username
                        }
                    })
                })
            })
            .catch(err => console.log(err));
    };

    handleFirstNameFilter = event => {
        const filterBy = event.target.value;
        this.setState({ firstNameFilter: filterBy });
        if (event.target.value === "") {
            this.setState({ filteredResults: [] })
        }
    }

    handleFirstNameFilterSubmit = event => {
        event.preventDefault();
        const filteredByFirstName = this.state.results.filter(each => each.first.toLowerCase().includes(this.state.firstNameFilter.toLocaleLowerCase()))
        this.setState({ filteredResults: filteredByFirstName })
        if (filteredByFirstName.length === 0) {
            alert("There were no matches!")
        }
    }

    sortBy = (columnName) => {
        if (this.state.filteredResults.length === 0) {

            this.sortResOrFiltRes(columnName, "results")

        } else if (this.state.filteredResults.length > 0) {

            this.sortResOrFiltRes(columnName, "filteredResults")
        }
    }

    sortResOrFiltRes = (columnName, whichResults) => {
        const newSortDir = columnName === this.state.sortCol ? !this.state.sortAsc : false

        if (newSortDir) {
            let results = this.state[whichResults].sort((a, b) => {
                return b[columnName].localeCompare(a[columnName])
            })
            this.setState({ whichResults: results, sortCol: columnName, sortAsc: true })
        } else {
            let results = this.state[whichResults].sort((a, b) => {
                return a[columnName].localeCompare(b[columnName])
            })
            this.setState({ whichResults: results, sortCol: columnName, sortAsc: false })
        }
    }

    render() {
        return (
            <>
                <Filter
                    firstNameFilter={this.state.firstNameFilter}
                    handleFirstNameFilter={this.handleFirstNameFilter}
                    handleFirstNameFilterSubmit={this.handleFirstNameFilterSubmit}
                />
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Employee</th>
                                    <th onClick={() => this.sortBy("first")} scope="col" >First Name</th>
                                    <th onClick={() => this.sortBy("last")} scope="col">Last Name</th>
                                    <th onClick={() => this.sortBy("email")} scope="col">Email</th>
                                    <th onClick={() => this.sortBy("login")} scope="col">Login</th>
                                    <th onClick={() => this.sortBy("phone")} scope="col">Phone Number</th>
                                </tr>
                            </thead>
                            <Row results={(this.state.firstNameFilter === "" || this.state.filteredResults.length === 0) ? this.state.results : this.state.filteredResults} />
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default Table;