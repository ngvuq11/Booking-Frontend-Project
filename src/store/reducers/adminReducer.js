import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  data: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allRequireDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // ----------------- ACTIONS GENDER -------------------
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.genders = [];
      state.isLoadingGender = false;
      return {
        ...state,
      };

    // ----------------- ACTIONS POSITION -------------------
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };

    // ----------------- ACTIONS ROLE -------------------
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };

    // ----------------- ACTIONS USERS -------------------
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };

    // ----------------- ACTIONS TOP DOCTOR -------------------
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };
    // ----------------- ACTIONS ALL DOCTOR -------------------
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };


    // ----------------- ACTIONS TIME -------------------
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      };


    // ----------------- ACTIONS DOCTOR INFOR -------------------
    case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS:
      state.allRequireDoctorInfor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAILED:
      state.allRequireDoctorInfor = [];
      return {
        ...state,
      };

    // ----------------- ACTIONS SPECIALTY -------------------
    case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
      state.data = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
      state.data = [];
      return {
        ...state,
      };

    // ----------------- ACTIONS CLINIC -------------------
    case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
      state.data = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CLINIC_FAILED:
      state.data = [];
      return {
        ...state,
      };
    // ----------------- ACTIONS HAND BOOK -------------------
    case actionTypes.FETCH_ALL_HAND_BOOK_SUCCESS:
      state.data = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_HAND_BOOK_FAILED:
      state.data = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
