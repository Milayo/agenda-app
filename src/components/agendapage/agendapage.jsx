import React, { Component } from "react";
import {
	MDBBtn,
	MDBModal,
	MDBIcon,
	MDBModalBody,
	MDBModalHeader,
	MDBModalFooter,
	MDBContainer,
	MDBRow,
	MDBCol,
} from "mdbreact";

import Event from "./../events/events.component.jsx";
import Form from "./../modalform/modalform.component.jsx";
import "./agendapage.css";

class AgendaPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,

			events: [
				{
					id: 1,
					time: "10:00",
					title: "Breakfast with Simon",
					location: "Lounge Caffe",
					description: "Discuss Q3 targets",
				},
				{
					id: 2,
					time: "10:30",
					title: "Daily Standup Meeting (recurring)",
					location: "Warsaw Spire Office",
				},
				{ id: 3, time: "11:00", title: "Call with HRs" },
				{
					id: 4,
					time: "12:00",
					title: "Lunch with Timmoty",
					location: "Canteen",
					description:
						"Project evalutation ile declaring a variable and using an if statement is a fine way to conditionally render a component, sometimes you might want to use a",
				},
			],
		};
	}

	addEvent = () => {
		let newArray = [...this.state.events];
		newArray.push({
			id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
			time: this.state.time,
			title: this.state.title,
			location: this.state.location,
			description: this.state.description,
		});

		this.setState({ events: newArray });
		this.setState({
			time: "",
			title: "",
			location: "",
			description: "",
		});
	};

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	handleInputChange = (inputName) => (value) => {
		const nextValue = value;
		this.setState({
			[inputName]: nextValue,
		});
	};

	handleDelete = (eventId) => {
		const events = this.state.events.filter(
			(event) => event.id !== eventId
		);
		this.setState({ events });
	};

	render() {
		return (
			<div>
				<MDBContainer className="agendapage">
					<MDBRow>
						<MDBCol md="9" className="mb-r">
							<h2 className="text-uppercase my-3">Today:</h2>
							<div>
								{this.state.events.map((event) => (
									<Event
										key={event.id}
										id={event.id}
										time={event.time}
										title={event.title}
										location={event.location}
										description={event.description}
										onDelete={this.handleDelete}
									/>
								))}
							</div>
							<MDBRow className="mb-4">
								<MDBCol
									xl="3"
									md="6"
									className="mx-auto text-center"
								>
									<MDBBtn
										color="info"
										rounded
										onClick={this.toggleModal}
									>
										Add Event
									</MDBBtn>
								</MDBCol>
							</MDBRow>
						</MDBCol>

						<MDBCol md="3">
							<h3 className="text-uppercase my-3">Schedule</h3>

							{this.state.events.length === 0 ? (
								<h6 className="my-3">No Schedule.</h6>
							) : (
								<h6 className="my-3">
									You are going to be busy today.
								</h6>
							)}
							<h6 className="my-3">
								You have{" "}
								<b>{this.state.events.length} events </b> today.
							</h6>
							<h1 className="my-3">
								<MDBRow>
									<MDBCol xs="3" className="text-center">
										<MDBIcon icon="sun" fixed />
									</MDBCol>
									<MDBCol xs="9">Sunny</MDBCol>
								</MDBRow>
								<MDBRow>
									<MDBCol xs="3" className="text-center">
										<MDBIcon
											icon="thermometer-three-quarters"
											fixed
										/>
									</MDBCol>
									<MDBCol xs="9">23°C</MDBCol>
								</MDBRow>
							</h1>
							<p>
								Don't forget your sunglasses. Today will dry and
								sunny, becoming warm in the afternoon with
								temperatures of between 20 and 25 degrees.
							</p>
						</MDBCol>
					</MDBRow>
				</MDBContainer>

				<MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
					<MDBModalHeader toggle={this.toggleModal}>
						Add your new event.
					</MDBModalHeader>
					<MDBModalBody>
						<Form handleInputChange={this.handleInputChange} />
					</MDBModalBody>
					<MDBModalFooter className="justify-content-center">
						<MDBBtn
							color="info"
							rounded
							onClick={() => {
								this.toggleModal();
								this.addEvent();
							}}
						>
							Add
						</MDBBtn>
					</MDBModalFooter>
				</MDBModal>
			</div>
		);
	}
}

export default AgendaPage;
