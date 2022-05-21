import axios from '../axios';

// ---------------- API ADMIN ----------------
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`, {
    id: inputId,
  });
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const handleLoginApi = (email, password) => {
  return axios.post('/api/login', { email, password });
};

const editUserService = (inputData) => {
  return axios.put('/api/edit-user', inputData);
};

const createNewUserService = (data) => {
  return axios.post('/api/create-new-user', data);
};

const deleteUserService = (userId) => {
  return axios.delete('/api/delete-user', { data: { id: userId } });
};

// ---------------- API DOCTOR ----------------

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post('/api/create-schedule', data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInforDoctor = (doctorId) => {
  return axios.get(`/api/get-extra_infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctor = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const saveDetailDoctorService = (data) => {
  return axios.post('/api/save-infor-doctor', data);
};

const postSendRemedy = (data) => {
  return axios.post('/api/send-remedy', data);
};

const postSendRemedyOnlineClinic = (data) => {
  return axios.post('/api/send-online-class-room', data);
};

const postSendBlockedNotification = (data) => {
  return axios.post('/api/send-blocked-notification', data);
};

const getMedicalRecordForDoctor = (doctorId) => {
  return axios.get(`/api/get-medical-record-for-doctor?doctorId=${doctorId}`);
};

const getPatientforDoctorById = (patientId) => {
  return axios.get(`/api/get-patient-for-doctor-by-id?patientId=${patientId}`);
};

// ---------------- API SPECIALTY ----------------

const getAllSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};

const getTopSpecialty = () => {
  return axios.get(`/api/get-top-specialty`);
};

const createNewSpecialty = (data) => {
  return axios.post('/api/create-new-specialty', data);
};

const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const deleteSpecialtyService = (specialtyId) => {
  return axios.delete('/api/delete-specialty', { data: { id: specialtyId } });
};

const editSpecialtyService = (inputData) => {
  return axios.put('/api/edit-specialty', inputData);
};

// ---------------- API CLINIC ----------------

const createNewClinic = (data) => {
  return axios.post('/api/create-new-clinic', data);
};

const getAllClinic = () => {
  return axios.get(`/api/get-all-clinic`);
};

const getTopClinic = () => {
  return axios.get(`/api/get-top-clinic`);
};

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const deleteClinicService = (clinicId) => {
  return axios.delete('/api/delete-clinic', { data: { id: clinicId } });
};

const editClinicService = (inputData) => {
  return axios.put('/api/edit-clinic', inputData);
};

// ---------------- API PATIENT ----------------

const getAllPatient = () => {
  return axios.get(`/api/get-all-patient`);
};

const getAllPatientPayment = () => {
  return axios.get(`/api/get-all-patient-payment`);
};

const patientPayment = (data) => {
  return axios.post('/api/patient-payment', data);
};

const postBookAppointment = (data) => {
  return axios.post('/api/patient-book-appointment', data);
};

const postPaymentPatient = (data) => {
  return axios.post('/api/send-payment-patient', data);
};

const postVerifyEmail = (data) => {
  return axios.post('/api/verify-book-appointment', data);
};

// ---------------- API COVID-19 ----------------

const getApiCovid19 = () => {
  return axios.get('https://static.pipezero.com/covid/data.json');
};

// ---------------- API HAND BOOK ----------------

const getAllBlogs = () => {
  return axios.get(`/api/get-all-hand-book`);
};

const getTopBlogs = () => {
  return axios.get(`/api/get-top-hand-book`);
};

const createNewBlogs = (data) => {
  return axios.post('/api/create-new-hand-book', data);
};

const getAllDetailBlogById = (data) => {
  return axios.get(`/api/get-detail-hand-book-by-id?id=${data.id}`);
};

const deleteBlogsService = (blogId) => {
  return axios.delete('/api/delete-hand-book', { data: { id: blogId } });
};

const editBlogsService = (data) => {
  return axios.put('/api/edit-hand-book', data);
};

export {
  // ---------------- API ADMIN ----------------
  getAllUsers,
  handleLoginApi,
  editUserService,
  deleteUserService,
  getAllCodeService,
  createNewUserService,
  // ---------------- API DOCTOR ----------------

  getAllDoctors,
  postSendRemedy,
  getProfileDoctor,
  getExtraInforDoctor,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getAllPatientForDoctor,
  getTopDoctorHomeService,
  saveDetailDoctorService,
  getScheduleDoctorByDate,
  getPatientforDoctorById,
  getMedicalRecordForDoctor,
  postSendRemedyOnlineClinic,
  postSendBlockedNotification,
  // ---------------- API SPECIALTY ----------------
  getAllSpecialty,
  getTopSpecialty,
  createNewSpecialty,
  editSpecialtyService,
  deleteSpecialtyService,
  getAllDetailSpecialtyById,
  // ---------------- API CLINIC ----------------
  getAllClinic,
  getTopClinic,
  createNewClinic,
  editClinicService,
  deleteClinicService,
  getAllDetailClinicById,
  // ---------------- API PATIENT ----------------
  getAllPatient,
  patientPayment,
  postVerifyEmail,
  postPaymentPatient,
  postBookAppointment,
  getAllPatientPayment,
  // ---------------- API COVID-19 ----------------
  getApiCovid19,
  // ---------------- API HAND BOOK ----------------
  getAllBlogs,
  getTopBlogs,
  createNewBlogs,
  editBlogsService,
  deleteBlogsService,
  getAllDetailBlogById,
};
