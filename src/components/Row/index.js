import React from "react";

function Row(props) {
    return (
        <tbody>
            {props.results.map(employee => (
                <tr key={employee.id.value}>
                    <th><img src={employee.picture.thumbnail}></img></th>
                    <td>{employee.name.first}</td>
                    <td>{employee.name.last}</td>
                    <td>{employee.email}</td>
                    <td>{employee.login.username}</td>
                    <td>{employee.phone}</td>
                </tr>
            ))}
        </tbody>
    );
}

export default Row;