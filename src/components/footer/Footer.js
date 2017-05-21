import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import FooterIcon from './FooterIcon';
import SettingsModal from './SettingsModal';
import HelpModal from './HelpModal';
import LoginButton from './LoginButton';

export default class Footer extends Component {

	state = {
		showHelpModal: false,
		activeHelpTab: "1",
		dropDownOpen: false,
	}

	toggleDropDown = () => {
		this.setState(prevState => ({
			dropDownOpen: !prevState.dropDownOpen
		}));
	}

	toggleHelpModal = () => {
		this.setState(prevState => ({
			showHelpModal: !prevState.showHelpModal
		}), () => {
			if (!this.state.showModal) {
				this.setState({
					activeHelpTab: "1",
				})
			}
		})
	}

	toggleHelpTabs = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeHelpTab: tab
			});
		}
	}


	render() {
		const {
			animatedClass,
			nightMode, toggleNightMode,
			db, login, logout,
			toggleConversation, showConversation,
			handleSaveSettings,
			babyChetMode, handleBabyChet, handleWipeBabyChetsMind,
			values, conversations,
		} = this.props;


		const { name, color } = this.props.db;
		const { showHelpModal, activeHelpTab } = this.state;

		return (
			<div
				style={{
					position: "fixed",
					bottom: 0,
					height: 55 + "px",
					width: 100 + "%",
					padding: 10 + "px",
					color: animatedClass ? animatedClass : "white",
				}}
				className={animatedClass}
			>
				<div style={{ paddingTop: 8 + "px" }}>
					<Row className="text-center">

						<Col
							xs={{ size: 3, offset: 0 }}
							md={{ size: 1, offset: 4 }}
						>
							{!db.uid &&
								<LoginButton
									db={db}
									login={login}
									logout={logout}
									babyChetMode={babyChetMode}
									handleBabyChet={handleBabyChet}
									loggingIn={db.loggingIn}
								/>
							}
							{db.uid  && values && this.props.db &&
								<SettingsModal
									handleSubmit={handleSaveSettings}
									dbColor={color}
									dbName={name}
									values={values}
									db={db}
									conversations={conversations}
									babyChetMode={babyChetMode}
									handleBabyChet={handleBabyChet}
									handleWipeBabyChetsMind={handleWipeBabyChetsMind}
									logout={logout}
								/>
							}
						</Col>
						<Col xs={3} md={1}>
							<FooterIcon
								type="tasks"
								condition={showConversation}
								onClick={toggleConversation}
							/>
						</Col>

						<Col xs={3} md={1} id="google">
							<FooterIcon
								type="moon-o"
								condition={nightMode}
								onClick={toggleNightMode}
							/>
						</Col>

						<Col xs={3} md={1}>
							<FooterIcon
								type="question-circle-o"
								condition={showHelpModal}
								onClick={this.toggleHelpModal}
							/>
							<HelpModal
								showHelpModal={showHelpModal}
								toggleHelpModal={this.toggleHelpModal}
								activeHelpTab={activeHelpTab}
								toggleHelpTabs={this.toggleHelpTabs}
							/>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}
