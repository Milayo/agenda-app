import React from 'react';
import { MDBInput } from "mdbreact";


const Form = ({handleInputChange}) => {
  return (
   
    	<form className="mx-3 grey-text">
							<MDBInput
								name="time"
								label="Time"
								icon="clock"
								hint="00:00"
								group
								type="text"
								getValue={handleInputChange("time")}
							/>
							<MDBInput
								name="title"
								label="Title"
								icon="edit"
								hint="title"
								group
								type="text"
								getValue={handleInputChange("title")}
							/>
							<MDBInput
								name="location"
								label="Location (optional)"
								icon="map"
								group
								type="text"
								getValue={handleInputChange("location")}
							/>
							<MDBInput
								name="description"
								label="Description (optional)"
								icon="sticky-note"
								group
								type="textarea"
								getValue={handleInputChange("description")}
							/>
						</form>
    
  )
}

export default Form;