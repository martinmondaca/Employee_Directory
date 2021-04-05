import React from "react";
import "./style.css"

function Filter() {
    return (
        <div className="row" id="searchField">
            <div className="col">
                <form className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <label for="searchBy" className="sr-only">Search by first name:</label>
                        <input type="name" className="form-control" id="searchBy" placeholder="first name" />
                    </div>
                    <button type="submit" class="btn btn-primary mb-2">Search</button>

                </form>
            </div>

        </div>)
}

export default Filter;