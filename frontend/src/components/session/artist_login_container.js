import { connect } from "react-redux";
import { receiveSessionErrors } from "../../actions/user_session_actions";
import { loginArtist } from '../../actions/artist_session_actions';
import LoginForm from "./login_form";

const mapStateToProps = (state, ownProps) => ({
  errors: Object.values(state.errors.session),
  formType: "artistLogin"
});

const mapDispatchToProps = (dispatch) => ({
  login: (artist) => dispatch(loginArtist(artist)),
  removeSessionErrors: () => dispatch(receiveSessionErrors([])),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);