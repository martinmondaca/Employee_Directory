import React from "react";

function Row(props) {
    return (
        <tbody>
            {console.log(props)}
            {props.results.map(employee => (
                <tr key={employee.id.value}>
                    <th><img alt={[`image of ${employee.name}`]} src={employee.picture.thumbnail}></img></th>
                    <td>{employee.first}</td>
                    <td>{employee.last}</td>
                    <td>{employee.email}</td>
                    <td>{employee.login}</td>
                    <td>{employee.phone}</td>
                </tr>
            ))
            }
        </tbody >
    );
}

export default Row;