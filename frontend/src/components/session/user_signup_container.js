import { connect } from "react-redux";
import { signupUser, receiveSessionErrors } from "../../actions/user_session_actions";
// import { closeModal } from "../../actions/modal_actions";
import SignupForm from "./signup_form";

const mapStateToProps = (state, ownProps) => ({
  formType: "Username",
});

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signupUser(user)),
  removeSessionErrors: () => dispatch(receiveSessionErrors([])),
  // closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
