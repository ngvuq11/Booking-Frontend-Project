export const adminMenu = [
  {
    // Quản lý người dùng
    name: 'menu.admin.manage',
    menus: [
      {
        // Dashboard
        name: 'menu.admin.dashboard',
        link: '/system/dashboard',
      },
      {
        // Quản lý Users
        name: 'menu.admin.manage-user',
        link: '/system/manage-user',
      },
      {
        // Quản lý lên lịch khám bệnh của bác sĩ
        name: 'menu.admin.manage-doctor',
        link: '/system/manage-doctor',
      },
      {
        // Quản lý chuyên khoa
        name: 'menu.admin.manage-specialty',
        link: '/system/manage-specialty',
      },
      {
        // Quản lý phòng khám
        name: 'menu.admin.manage-clinic',
        link: '/system/manage-clinic',
      },
      {
        // Quản lý cẩm nang
        name: 'menu.admin.manage-handbook',
        link: '/system/manage-handbook',
      },
      {
        // Quản lý thanh toán - thống kê
        name: 'menu.admin.manage-payment',
        link: '/system/manage-payment',
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: 'menu.admin.manage-user',
    menus: [
      {
        // Quản lý kế hoạch khám bệnh của bác sĩ
        name: 'menu.admin.dashboard',
        link: '/doctor/dashboard-doctor',
      },
      {
        // Quản lý kế hoạch khám bệnh của bác sĩ
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/manage-schedule',
      },
      {
        // Quản lý bệnh nhân khám bệnh của bác sĩ
        name: 'menu.doctor.manage-patient',
        link: '/doctor/manage-patient',
      },
      {
        // Quản lý bệnh nhân khám bệnh của bác sĩ
        name: 'menu.doctor.manage-medical-record',
        link: '/doctor/manage-medical-record',
      },
    ],
  },
];
