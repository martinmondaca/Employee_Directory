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
        this.searchRandoEmp(50)
    }


    searchRandoEmp = query => {
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

    // searchRandoEmp = query => {
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
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
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