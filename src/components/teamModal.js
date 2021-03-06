import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as teamActions from "../actions/teamActions";
import PropTypes from "prop-types";
import React from "react";
import TeamModalPositionPlayers from "./teamModalPositionPlayers";

class teamModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { season: "" };
  }

  renderData(item) {
    return <option value={item.team_id}>{item.team_name}</option>;
  }

  render() {
    if (!this.props.team.selectedTeam) {
      return <div />;
    } else if (
      !this.props.team.teamPlayers ||
      this.props.team.fetchingPlayers ||
      !this.props.team.teamData ||
      this.props.team.fetchingTeam
    ) {
      return <div>Loading team...</div>;
    } else {
      return (
        <Modal
          show={true}
          onHide={() => {
            this.props.teamActions.selectTeam(null);
          }}
          className="team"
        >
          <Modal.Header closeButton>
            <img
              src={this.props.team.teamData.logo_path}
              alt={this.props.team.teamData.name}
              className="logo"
            />
            <span className="team-name">{this.props.team.teamData.name}</span>
          </Modal.Header>
          <Modal.Body className="players">
            <TeamModalPositionPlayers
              positionId={1}
              positionName="Goalkeepers"
              players={this.props.team.teamPlayers}
            />

            <TeamModalPositionPlayers
              positionId={2}
              positionName="Defenders"
              players={this.props.team.teamPlayers}
            />

            <TeamModalPositionPlayers
              positionId={3}
              positionName="Midfielders"
              players={this.props.team.teamPlayers}
            />

            <TeamModalPositionPlayers
              positionId={4}
              positionName="Forwards"
              players={this.props.team.teamPlayers}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.props.teamActions.selectTeam(null);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
}

teamModal.propTypes = {
  teamActions: PropTypes.object,
  team: PropTypes.object
};

function mapStateToProps(state) {
  return {
    team: state.team
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teamActions: bindActionCreators(teamActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(teamModal);
