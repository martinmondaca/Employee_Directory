import React, { Component } from "react";
import API from "../../utils/API"
import Row from "../Row/index"
import Filter from "../Filter/index"

class Table extends Component {
    state = {
        results: [],
        firstNameFilter: "",
        filteredResults: []
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
            // console.log(this.state.results.results[0])
            // console.log(this.state.results)
            // console.log(typeof (this.state.results))

            .catch(err => console.log(err));
    };

    // searchRandomEmp = query => {
    //     API.search(query)
    //         .then(results => {
    //             console.log(results.data.results)
    //             this.setState(results.data.results.map(employee => {
    //                 return {
    //                     key: employee.id.value,
    //                     img: employee.picture.thumbnail,
    //                     first_name: employee.name.first,
    //                     last_name: employee.name.last_name,
    //                     email: employee.email,
    //                     login: employee.login.username,
    //                     phone_number: employee.phone
    //                 }
    //             }))
    //         })
    //     console.log("saved state")
    //     console.log(this.state.results)

    // }
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

    //numerical sort
    compareNumbers = (a, b) => { return a - b };

    //first name sort
    sortByFirstName = () => {

        let results = this.state.results.sort((a, b) => {
            return a.name.first.localeCompare(b.name.first)
        })
        this.setState({ results: results })
    }

    //last name sort
    sortByLastName = () => {

        let results = this.state.results.sort((a, b) => {
            return a.name.last.localeCompare(b.name.last)
        })
        this.setState({ results: results })
    }

    sortByEmail = () => {
        let results = this.state.results.sort((a, b) => {
            return a.email.localeCompare(b.email)
        })
        this.setState({ results: results })
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
                                    <th onClick={() => this.sortByFirstName()} scope="col" >First Name</th>
                                    <th onClick={() => this.sortByLastName()} scope="col">Last Name</th>
                                    <th onClick={() => this.sortByEmail()} scope="col">Email</th>
                                    <th scope="col">Login</th>
                                    <th scope="col">Phone Number</th>
                                </tr>
                            </thead>
                            <Row results={(this.state.firstNameFilter === "" || this.state.filteredResults.length === 0) ? this.state.results : this.state.filteredResults} />
                        </table>
                    </div>
                </div>
            </>
        )
    }


    // key img first_name last_name email login phone_number



}

export default Table;