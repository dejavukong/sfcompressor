export interface Classification {
  id: string;
  code: string;
  name: { zh: string; en: string };
  scope: { zh: string; en: string };
  website: string;
  color: string;
  sortOrder: number;
}

export interface QualitySystem {
  id: string;
  standard: string;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  sortOrder: number;
}

export interface Patent {
  id: string;
  number: string;
  name: { zh: string; en: string };
  type: { zh: string; en: string };
  applicationDate: string;
  authorizationDate: string;
  sortOrder: number;
}

export interface Honor {
  id: string;
  name: { zh: string; en: string };
  sortOrder: number;
}

export const classifications: Classification[] = [
  {
    id: '1',
    code: 'CCS',
    name: { zh: '中国船级社', en: 'China Classification Society' },
    scope: { zh: '全系列船用压缩机产品型式认可', en: 'Type approval for full range of marine compressor products' },
    website: 'https://www.ccs.org.cn',
    color: '#1d4ed8',
    sortOrder: 8,
  },
  {
    id: '2',
    code: 'DNV',
    name: { zh: '挪威船级社', en: 'Det Norske Veritas' },
    scope: { zh: '船用空压机、海工平台应用', en: 'Marine air compressors, offshore platform applications' },
    website: 'https://www.dnv.cn',
    color: '#003366',
    sortOrder: 7,
  },
  {
    id: '3',
    code: 'ABS',
    name: { zh: '美国船级社', en: 'American Bureau of Shipping' },
    scope: { zh: '商船及海工装备认证', en: 'Merchant ship and offshore equipment certification' },
    website: 'https://ww2.eagle.org',
    color: '#005596',
    sortOrder: 6,
  },
  {
    id: '4',
    code: 'LR',
    name: { zh: '英国劳氏船级社', en: "Lloyd's Register" },
    scope: { zh: '船舶辅机设备认证', en: 'Marine auxiliary equipment certification' },
    website: 'https://www.lr.org',
    color: '#E30613',
    sortOrder: 5,
  },
  {
    id: '5',
    code: 'BV',
    name: { zh: '法国船级社', en: 'Bureau Veritas' },
    scope: { zh: '船用压缩机系统', en: 'Marine compressor systems' },
    website: 'https://marine-offshore.bureauveritas.com',
    color: '#FF6600',
    sortOrder: 4,
  },
  {
    id: '6',
    code: 'NK',
    name: { zh: '日本海事协会', en: 'ClassNK' },
    scope: { zh: '日本船东项目', en: 'Japanese shipowner projects' },
    website: 'https://www.classnk.or.jp',
    color: '#D7000F',
    sortOrder: 3,
  },
  {
    id: '7',
    code: 'KR',
    name: { zh: '韩国船级社', en: 'Korean Register' },
    scope: { zh: '船舶建造项目认证', en: 'Ship construction project certification' },
    website: 'https://www.krs.co.kr',
    color: '#003478',
    sortOrder: 2,
  },
  {
    id: '8',
    code: 'RINA',
    name: { zh: '意大利船级社', en: 'Registro Italiano Navale' },
    scope: { zh: '船舶及海工设备认证', en: 'Marine and offshore equipment certification' },
    website: 'https://www.rina.org',
    color: '#1B5E20',
    sortOrder: 1,
  },
];

export const qualitySystems: QualitySystem[] = [
  {
    id: '1',
    standard: 'ISO 9001',
    name: { zh: '质量管理体系', en: 'Quality Management System' },
    description: { zh: '设计、制造、服务全过程', en: 'Design, manufacturing, service processes' },
    sortOrder: 3,
  },
  {
    id: '2',
    standard: 'ISO 14001',
    name: { zh: '环境管理体系', en: 'Environmental Management System' },
    description: { zh: '绿色制造、环保合规', en: 'Green manufacturing, environmental compliance' },
    sortOrder: 2,
  },
  {
    id: '3',
    standard: 'ISO 45001',
    name: { zh: '职业健康安全', en: 'Occupational Health & Safety' },
    description: { zh: '员工安全、作业规范', en: 'Employee safety, operational standards' },
    sortOrder: 1,
  },
];

export const patents: Patent[] = [
  {
    id: '1',
    number: 'CN202311480664.8',
    name: { zh: '一种船舶电驱动系统用散热设备', en: 'Heat Dissipation Equipment for Marine Electric Drive Systems' },
    type: { zh: '发明专利', en: 'Invention Patent' },
    applicationDate: '2023-11-08',
    authorizationDate: '2023-12-19',
    sortOrder: 26,
  },
  {
    id: '2',
    number: 'CN202210206064.1',
    name: { zh: '一种船用空气压缩机', en: 'Marine Air Compressor' },
    type: { zh: '发明专利', en: 'Invention Patent' },
    applicationDate: '2022-02-28',
    authorizationDate: '2023-11-14',
    sortOrder: 25,
  },
  {
    id: '3',
    number: 'CN202220500305.9',
    name: { zh: '一种用于船用空气压缩机上的易熔塞', en: 'Fusible Plug for Marine Air Compressors' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2022-03-09',
    authorizationDate: '2022-07-26',
    sortOrder: 24,
  },
  {
    id: '4',
    number: 'CN202220491307.6',
    name: { zh: '一种用于船用空气压缩机上的进气消音过滤器', en: 'Intake Silencer Filter for Marine Air Compressors' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2022-03-09',
    authorizationDate: '2022-07-26',
    sortOrder: 23,
  },
  {
    id: '5',
    number: 'CN202123239802.2',
    name: { zh: '一种撬装气体压缩机用冷却装置', en: 'Cooling Device for Skid-Mounted Gas Compressors' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2021-12-22',
    authorizationDate: '2022-06-17',
    sortOrder: 22,
  },
  {
    id: '6',
    number: 'CN202123239709.1',
    name: { zh: '一种压缩机撬装结构', en: 'Compressor Skid-Mounted Structure' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2021-12-22',
    authorizationDate: '2022-06-17',
    sortOrder: 21,
  },
  {
    id: '7',
    number: 'CN202123237396.6',
    name: { zh: '一种用于对称平衡式压缩机的刮油装置', en: 'Oil Scraper Device for Symmetrically Balanced Compressors' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2021-12-22',
    authorizationDate: '2022-06-14',
    sortOrder: 20,
  },
  {
    id: '8',
    number: 'CN202123223721.3',
    name: { zh: '一种用于对称平衡式压缩机的级差活塞', en: 'Stepped Piston for Symmetrically Balanced Compressors' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2021-12-21',
    authorizationDate: '2022-06-14',
    sortOrder: 19,
  },
  {
    id: '9',
    number: 'CN202123237839.1',
    name: { zh: '一种对称平衡式无润滑压缩机用进油管组件', en: 'Oil Inlet Pipe Assembly for Symmetrically Balanced Non-Lubricated Compressors' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2021-12-22',
    authorizationDate: '2022-06-14',
    sortOrder: 18,
  },
  {
    id: '10',
    number: 'CN202111582076.6',
    name: { zh: '一种用于对称平衡式自由活塞压缩机的吊装机构', en: 'Lifting Mechanism for Symmetrically Balanced Free-Piston Compressors' },
    type: { zh: '发明专利', en: 'Invention Patent' },
    applicationDate: '2021-12-22',
    authorizationDate: '2022-03-29',
    sortOrder: 17,
  },
  {
    id: '11',
    number: 'CN202022913499.9',
    name: { zh: '工艺压缩机抑制气流脉动结构', en: 'Pulsation Dampening Structure for Process Compressors' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2020-12-07',
    authorizationDate: '2021-07-30',
    sortOrder: 16,
  },
  {
    id: '12',
    number: 'CN202022914935.4',
    name: { zh: '低压进排气阀', en: 'Low-Pressure Intake and Exhaust Valve' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2020-12-07',
    authorizationDate: '2021-07-27',
    sortOrder: 15,
  },
  {
    id: '13',
    number: 'CN202022855968.6',
    name: { zh: '一种工艺压缩机用润滑装置', en: 'Lubrication Device for Process Compressors' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2020-12-01',
    authorizationDate: '2021-07-20',
    sortOrder: 14,
  },
  {
    id: '14',
    number: 'CN202022907114.8',
    name: { zh: '弹性补偿支撑装置', en: 'Elastic Compensating Support Device' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2020-12-07',
    authorizationDate: '2021-07-20',
    sortOrder: 13,
  },
  {
    id: '15',
    number: 'CN202022837208.2',
    name: { zh: '一种压缩机控制器', en: 'Compressor Controller' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2020-12-01',
    authorizationDate: '2021-07-13',
    sortOrder: 12,
  },
  {
    id: '16',
    number: 'CN202022837201.0',
    name: { zh: '恒温油箱', en: 'Constant Temperature Oil Tank' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2020-12-01',
    authorizationDate: '2021-07-13',
    sortOrder: 11,
  },
  {
    id: '17',
    number: 'CN202022847738.5',
    name: { zh: '一种氢气压缩机密封结构', en: 'Hydrogen Compressor Sealing Structure' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2020-12-01',
    authorizationDate: '2021-07-09',
    sortOrder: 10,
  },
  {
    id: '18',
    number: 'CN201920327977.2',
    name: { zh: '一种压缩机活塞安装机构', en: 'Compressor Piston Installation Mechanism' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2019-03-15',
    authorizationDate: '2020-03-31',
    sortOrder: 9,
  },
  {
    id: '19',
    number: 'CN201920327985.7',
    name: { zh: '一种防漏气的压缩机箱体', en: 'Leak-Proof Compressor Housing' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2019-03-15',
    authorizationDate: '2019-12-24',
    sortOrder: 8,
  },
  {
    id: '20',
    number: 'CN201920327988.0',
    name: { zh: '一种皮带电机的导轨安装机构', en: 'Belt Motor Guide Rail Installation Mechanism' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2019-03-15',
    authorizationDate: '2019-11-19',
    sortOrder: 7,
  },
  {
    id: '21',
    number: 'CN201822087814.X',
    name: { zh: '一种新型压缩机刮油结构', en: 'New Compressor Oil Scraping Structure' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2018-12-13',
    authorizationDate: '2019-11-15',
    sortOrder: 6,
  },
  {
    id: '22',
    number: 'CN201822087918.0',
    name: { zh: '一种透平式压缩机上轴向迷宫密封装置', en: 'Axial Labyrinth Seal Device for Turbine Compressors' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2018-12-13',
    authorizationDate: '2019-10-29',
    sortOrder: 5,
  },
  {
    id: '23',
    number: 'CN201822088033.2',
    name: { zh: '一种压缩机用油气分离器', en: 'Oil-Gas Separator for Compressors' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2018-12-13',
    authorizationDate: '2019-10-29',
    sortOrder: 4,
  },
  {
    id: '24',
    number: 'CN201822087920.8',
    name: { zh: '一种压缩机润滑油超压卸荷阀', en: 'Compressor Lubricating Oil Overpressure Relief Valve' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2018-12-13',
    authorizationDate: '2019-10-22',
    sortOrder: 3,
  },
  {
    id: '25',
    number: 'CN201822088485.0',
    name: { zh: '一种新型压缩机限位结构', en: 'New Compressor Limiting Structure' },
    type: { zh: '实用新型', en: 'Utility Model' },
    applicationDate: '2018-12-13',
    authorizationDate: '2019-10-22',
    sortOrder: 2,
  },
  {
    id: '26',
    number: 'CN201910196378.6',
    name: { zh: '一种皮带电机的导轨安装机构', en: 'Belt Motor Guide Rail Installation Mechanism' },
    type: { zh: '发明专利', en: 'Invention Patent' },
    applicationDate: '2019-03-15',
    authorizationDate: '2019-09-06',
    sortOrder: 1,
  },
];

export const honors: Honor[] = [
  {
    id: '1',
    name: { zh: '2024年度江苏省专精特新中小企业', en: '2024 Jiangsu Province Specialized, Refined, Distinctive, and Innovative SME' },
    sortOrder: 1,
  },
];
