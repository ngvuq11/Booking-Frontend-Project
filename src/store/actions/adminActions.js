import actionTypes from './actionTypes';
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getAllSpecialty,
  createNewSpecialty,
  deleteSpecialtyService,
  editSpecialtyService,
  getAllClinic,
  createNewClinic,
  deleteClinicService,
  editClinicService,
  getAllBlogs,
  createNewBlogs,
  editBlogsService,
  deleteBlogsService,
  getAllPatientPayment,
  getAllPatient,
  getDetailInforDoctor,
} from '../../services/userService';

import { toast } from 'react-toastify';

// GENDER
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });

      let res = await getAllCodeService('GENDER');
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log('fetchGenderFailed error: ', e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//POSITION

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('POSITION');
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log('fetchPositionFailed error: ', e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

// ROLE

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('ROLE');
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log('fetchRoleFailed error: ', e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

// CREATE USER

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success('Create a new user success !');
        dispatch(createUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error('Create a new user error !');
        dispatch(createUserFailed());
      }
    } catch (e) {
      toast.error('Create a new user error !');
      dispatch(createUserFailed());
      console.log('createUserFailed error: ', e);
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

// LIST USER

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers('ALL');
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error('Fetch a user error !');
      dispatch(fetchAllUsersFailed());
      console.log('fetchAllUsersFailed error: ', e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

// EDIT USER

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success('Update the user success !');
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error('Update the user error !');
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error('Update the user error !');
      dispatch(editUserFailed());
      console.log('editUserFailed error: ', e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

// DELETE USER

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success('Delete the user success !');
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error('Delete the user error !');
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error('Delete the user error !');
      dispatch(deleteUserFailed());
      console.log('deleteUserFailed error: ', e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService(4);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log('FETCH_TOP_DOCTORS_FAILED: ', e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log('FETCH_ALL_DOCTORS_FAILED: ', e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success('Save infor detail doctor success !');
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error('Save infor detail doctor error !');
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      toast.error('Save infor detail doctor error !');
      console.log('SAVE_DETAIL_DOCTOR_FAILED: ', e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('TIME');
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

// Doctor price

export const getRequireDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_START,
      });

      let resPrice = await getAllCodeService('PRICE');
      let resPayment = await getAllCodeService('PAYMENT');
      let resProvince = await getAllCodeService('PROVINCE');
      let resSpecialty = await getAllSpecialty('SPECIALTY');
      let resClinic = await getAllClinic('CLINIC');

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchRequireDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequireDoctorInforFailed());
      }
    } catch (e) {
      dispatch(fetchRequireDoctorInforFailed());
      console.log('fetch Require Doctor Infor Failed error: ', e);
    }
  };
};

export const fetchRequireDoctorInforSuccess = (requireData) => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS,
  data: requireData,
});

export const fetchRequireDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAILED,
});

export const fetchDetailInforDoctor = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log('FETCH_DETAIL_DOCTOR_FAILED: ', e);
      dispatch({
        type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

// ------------------ ACTIONS SPECIALTY ------------------

export const fetchAllSpecialty = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllSpecialty();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
        });
      }
    } catch (e) {
      toast.error('Fetch a specialty error !');
      dispatch({
        type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
      });
      console.log('fetch All Specialty Failed error: ', e);
    }
  };
};

// ------------------ CREATE SPECIALTY ------------------

export const fetchCreateNewSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewSpecialty(data);
      if (res && res.errCode === 0) {
        toast.success('Create a new user success !');
        dispatch(fetchCreateSpecialtySuccess());
        dispatch(fetchAllSpecialty());
      } else {
        toast.error('Create a new Specialty error !');
        dispatch(fetchCreateSpecialtyFailed());
      }
    } catch (e) {
      toast.error('Create a new Specialty error !');
      dispatch(fetchCreateSpecialtyFailed());
      console.log('create Specialty Failed error: ', e);
    }
  };
};

export const fetchCreateSpecialtySuccess = () => ({
  type: actionTypes.CREATE_SPECIALTY_SUCCESS,
});

export const fetchCreateSpecialtyFailed = () => ({
  type: actionTypes.CREATE_SPECIALTY_FAILED,
});

// ------------------ UPDATE SPECIALTY ------------------

export const editSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editSpecialtyService(data);
      if (res && res.errCode === 0) {
        toast.success('Update the specialty success !');
        dispatch(editSpecialtySuccess());
        dispatch(fetchAllSpecialty());
      } else {
        toast.error('Update the specialty error !');
        dispatch(editSpecialtyFailed());
      }
    } catch (e) {
      toast.error('Update the specialty error !');
      dispatch(editSpecialtyFailed());
      console.log('Update Specialty Failed error: ', e);
    }
  };
};

export const editSpecialtySuccess = () => ({
  type: actionTypes.EDIT_SPECIALTY_SUCCESS,
});

export const editSpecialtyFailed = () => ({
  type: actionTypes.EDIT_SPECIALTY_FAILED,
});

// ------------------ DELETE SPECIALTY ------------------

export const deleteSpecialty = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteSpecialtyService(id);
      if (res && res.errCode === 0) {
        toast.success('Delete the specialty success !');
        dispatch(deleteSpecialtySuccess());
        dispatch(fetchAllSpecialty());
      } else {
        toast.error('Delete the specialty error !');
        dispatch(deleteSpecialtyFailed());
      }
    } catch (e) {
      toast.error('Delete the specialty error !');
      dispatch(deleteSpecialtyFailed());
      console.log('delete specialty Failed error: ', e);
    }
  };
};

export const deleteSpecialtySuccess = () => ({
  type: actionTypes.DELETE_SPECIALTY_SUCCESS,
});

export const deleteSpecialtyFailed = () => ({
  type: actionTypes.DELETE_SPECIALTY_FAILED,
});

// ----------------- ACTIONS CLINIC -------------------

export const fetchAllClinic = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllClinic();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_CLINIC_FAILED,
        });
      }
    } catch (e) {
      toast.error('Fetch a clinic error !');
      dispatch({
        type: actionTypes.FETCH_ALL_CLINIC_FAILED,
      });
      console.log('fetch All clinic Failed error: ', e);
    }
  };
};

// ------------------ CREATE CLINIC ------------------

export const fetchCreateNewClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewClinic(data);
      if (res && res.errCode === 0) {
        toast.success('Create a new clinic success !');
        dispatch(fetchCreateClinicSuccess());
        dispatch(fetchAllClinic());
      } else {
        toast.error('Create a new clinic error !');
        dispatch(fetchCreateClinicFailed());
      }
    } catch (e) {
      toast.error('Create a new clinic error !');
      dispatch(fetchCreateClinicFailed());
      console.log('create clinic Failed error: ', e);
    }
  };
};

export const fetchCreateClinicSuccess = () => ({
  type: actionTypes.CREATE_CLINIC_SUCCESS,
});

export const fetchCreateClinicFailed = () => ({
  type: actionTypes.CREATE_CLINIC_FAILED,
});

// ------------------ UPDATE CLINIC ------------------

export const editClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editClinicService(data);
      if (res && res.errCode === 0) {
        toast.success('Update the clinic success !');
        dispatch(editClinicSuccess());
        dispatch(fetchAllClinic());
      } else {
        toast.error('Update the clinic error !');
        dispatch(editClinicFailed());
      }
    } catch (e) {
      toast.error('Update the clinic error !');
      dispatch(editClinicFailed());
      console.log('Update clinic Failed error: ', e);
    }
  };
};

export const editClinicSuccess = () => ({
  type: actionTypes.EDIT_CLINIC_SUCCESS,
});

export const editClinicFailed = () => ({
  type: actionTypes.EDIT_CLINIC_FAILED,
});

// ------------------ DELETE CLINIC ------------------

export const deleteClinic = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteClinicService(id);
      if (res && res.errCode === 0) {
        toast.success('Delete the clinic success !');
        dispatch(deleteClinicSuccess());
        dispatch(fetchAllClinic());
      } else {
        toast.error('Delete the clinic error !');
        dispatch(deleteClinicFailed());
      }
    } catch (e) {
      toast.error('Delete the clinic error !');
      dispatch(deleteClinicFailed());
      console.log('delete clinic Failed error: ', e);
    }
  };
};

export const deleteClinicSuccess = () => ({
  type: actionTypes.DELETE_CLINIC_SUCCESS,
});

export const deleteClinicFailed = () => ({
  type: actionTypes.DELETE_CLINIC_FAILED,
});

// ----------------- ACTIONS HAND BOOK -------------------
export const fetchAllBlogs = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllBlogs();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_HAND_BOOK_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_HAND_BOOK_FAILED,
        });
      }
    } catch (e) {
      toast.error('Fetch a hand book error !');
      dispatch({
        type: actionTypes.FETCH_ALL_HAND_BOOK_FAILED,
      });
      console.log('fetch All hand book Failed error: ', e);
    }
  };
};

// ------------------ CREATE HAND BOOK ------------------

export const fetchCreateNewHandBook = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewBlogs(data);
      if (res && res.errCode === 0) {
        toast.success('Create a new hand book success !');
        dispatch(fetchCreateHandBookSuccess());
        dispatch(fetchAllBlogs());
      } else {
        toast.error('Create a new hand book error !');
        dispatch(fetchCreateHandBookFailed());
      }
    } catch (e) {
      toast.error('Create a new hand book error !');
      dispatch(fetchCreateHandBookFailed());
      console.log('create hand book Failed error: ', e);
    }
  };
};

export const fetchCreateHandBookSuccess = () => ({
  type: actionTypes.CREATE_HAND_BOOK_SUCCESS,
});

export const fetchCreateHandBookFailed = () => ({
  type: actionTypes.CREATE_HAND_BOOK_FAILED,
});

// ------------------ UPDATE HAND BOOK ------------------

export const editHandBook = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editBlogsService(data);
      if (res && res.errCode === 0) {
        toast.success('Update the hand book success !');
        dispatch(editHandBookSuccess());
        dispatch(fetchAllBlogs());
      } else {
        toast.error('Update the hand book error !');
        dispatch(editHandBookFailed());
      }
    } catch (e) {
      toast.error('Update the hand book error !');
      dispatch(editHandBookFailed());
      console.log('Update hand book Failed error: ', e);
    }
  };
};

export const editHandBookSuccess = () => ({
  type: actionTypes.EDIT_HAND_BOOK_SUCCESS,
});

export const editHandBookFailed = () => ({
  type: actionTypes.EDIT_HAND_BOOK_FAILED,
});

// ------------------ DELETE HAND BOOK ------------------

export const deleteHandBook = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteBlogsService(id);
      if (res && res.errCode === 0) {
        toast.success('Delete the hand book success !');
        dispatch(deleteHandBookSuccess());
        dispatch(fetchAllBlogs());
      } else {
        toast.error('Delete the hand book error !');
        dispatch(deleteHandBookFailed());
      }
    } catch (e) {
      toast.error('Delete the hand book error !');
      dispatch(deleteHandBookFailed());
      console.log('delete hand book Failed error: ', e);
    }
  };
};

export const deleteHandBookSuccess = () => ({
  type: actionTypes.DELETE_HAND_BOOK_SUCCESS,
});

export const deleteHandBookFailed = () => ({
  type: actionTypes.DELETE_HAND_BOOK_FAILED,
});

// ----------------- ACTIONS PAYMENT -------------------
export const fetchAllPayment = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllPatientPayment();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_PAYMENT_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_PAYMENT_FAILED,
        });
      }
    } catch (e) {
      toast.error('Fetch a payment error !');
      dispatch({
        type: actionTypes.FETCH_ALL_PAYMENT_FAILED,
      });
      console.log('fetch All payment Failed error: ', e);
    }
  };
};
// ----------------- ACTIONS PATIENT -------------------
export const fetchAllPatient = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllPatient();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_PATIENT_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_PATIENT_FAILED,
        });
      }
    } catch (e) {
      toast.error('Fetch a patient error !');
      dispatch({
        type: actionTypes.FETCH_ALL_PATIENT_FAILED,
      });
      console.log('fetch All patient Failed error: ', e);
    }
  };
};
