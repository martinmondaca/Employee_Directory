import React, { Component } from "react";
import API from "../../utils/API"
import Row from "../Row/index"
import Filter from "../Filter/index"

class Table extends Component {
    state = {
        results: [],
        firstNameFilter: "",
        filteredResults: [],
        sortAscDescFirst: true,
        sortAscDescLast: true,
        sortAscDescEmail: true,
        sortAscDescLogin: true,
        sortAscDescPhone: true,
    };

    componentDidMount() {
        this.searchRandomEmp(50)
    }


    searchRandomEmp = query => {
        API.search(query)
            .then(res => {
                this.setState({
                    results: res.data.results
                })
            })
            .catch(err => console.log(err));
    };

    handleFirstNameFilter = event => {
        const filterBy = event.target.value;
        this.setState({ firstNameFilter: filterBy });
        console.log(this.state.firstNameFilter)
        if (event.target.value === "") {
            this.setState({ filteredResults: [] })
        }
    }

    handleFirstNameFilterSubmit = event => {
        event.preventDefault();
        const filteredByFirstName = this.state.results.filter(each => each.name.first.toLowerCase().includes(this.state.firstNameFilter.toLocaleLowerCase()))
        this.setState({ filteredResults: filteredByFirstName })
        console.log(this.state.results)
        console.log(this.state.firstNameFilter)
    }

    //first name sort
    sortByFirstName = (column) => {
        if (this.state.filteredResults.length === 0) {
            if (this.state.sortAscDescFirst) {
                let results = this.state.results.sort((a, b) => {
                    return a.name.first.localeCompare(b.name.first)
                })
                this.setState({ results: results })
                this.setState({ sortAscDescFirst: false })
            } else {
                let results = this.state.results.sort((a, b) => {
                    return b.name.first.localeCompare(a.name.first)
                })
                this.setState({ results: results })
                this.setState({ sortAscDescFirst: true })
            }
            this.setState({ sortAscDescLast: true, sortAscDescEmail: true, sortAscDescLogin: true, sortAscDescPhone: true })
        } else if (this.state.filteredResults.length > 0) {
            if (this.state.sortAscDescFirst) {
                let results = this.state.filteredResults.sort((a, b) => {
                    return a.name.first.localeCompare(b.name.first)
                })
                this.setState({ filteredResults: results })
                this.setState({ sortAscDescFirst: false })
            } else {
                let results = this.state.filteredResults.sort((a, b) => {
                    return b.name.first.localeCompare(a.name.first)
                })
                this.setState({ filteredResults: results })
                this.setState({ sortAscDescFirst: true })
            }
            this.setState({ sortAscDescLast: true, sortAscDescEmail: true, sortAscDescLogin: true, sortAscDescPhone: true })
        }

    }

    //last name sort
    sortByLastName = () => {

        if (this.state.sortAscDescLast) {
            let results = this.state.results.sort((a, b) => {
                return a.name.last.localeCompare(b.name.last)
            })
            this.setState({ results: results })
            this.setState({ sortAscDescLast: false })
        } else {
            let results = this.state.results.sort((a, b) => {
                return b.name.last.localeCompare(a.name.last)
            })
            this.setState({ results: results })
            this.setState({ sortAscDescLast: true })
        }
        this.setState({ sortAscDescFirst: true, sortAscDescEmail: true, sortAscDescLogin: true, sortAscDescPhone: true })

    }

    sortByEmail = () => {
        if (this.state.sortAscDescEmail) {
            let results = this.state.results.sort((a, b) => {
                return a.email.localeCompare(b.email)
            })
            this.setState({ results: results })
            this.setState({ sortAscDescEmail: false })
        } else {
            let results = this.state.results.sort((a, b) => {
                return b.email.localeCompare(a.email)
            })
            this.setState({ results: results })
            this.setState({ sortAscDescEmail: true })
        }
        this.setState({ sortByFirstName: true, sortAscDescLast: true, sortAscDescLogin: true, sortAscDescPhone: true })
    }

    sortByLogin = () => {
        if (this.state.sortAscDescLogin) {
            let results = this.state.results.sort((a, b) => {
                return a.login.username.localeCompare(b.login.username)
            })
            this.setState({ results: results })
            this.setState({ sortAscDescLogin: false })
        } else {
            let results = this.state.results.sort((a, b) => {
                return b.login.username.localeCompare(a.login.username)
            })
            this.setState({ results: results })
            this.setState({ sortAscDescLogin: true })
        }
        this.setState({ sortByFirstName: true, sortAscDescLast: true, sortAscDescEmail: true, sortAscDescPhone: true })
    }

    sortByPhone = () => {
        if (this.state.sortAscDescPhone) {
            let results = this.state.results.sort((a, b) => {
                return a.phone.localeCompare(b.phone)
            })
            this.setState({ results: results })
            this.setState({ sortAscDescPhone: false })
        } else {
            let results = this.state.results.sort((a, b) => {
                return b.phone.localeCompare(a.phone)
            })
            this.setState({ results: results })
            this.setState({ sortAscDescPhone: true })
        }
        this.setState({ sortByFirstName: true, sortAscDescLast: true, sortAscDescEmail: true, sortAscDescLogin: true })
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
                                    <th onClick={() => alert("hi")} scope="col">Employee</th>
                                    <th onClick={() => this.sortByFirstName("name.first")} scope="col" >First Name</th>
                                    <th onClick={() => this.sortByLastName()} scope="col">Last Name</th>
                                    <th onClick={() => this.sortByEmail()} scope="col">Email</th>
                                    <th onClick={() => this.sortByLogin()} scope="col">Login</th>
                                    <th onClick={() => this.sortByPhone()} scope="col">Phone Number</th>
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