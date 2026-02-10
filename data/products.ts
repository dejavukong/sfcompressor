export interface Product {
  id: string;
  category: 'marine' | 'industrial' | 'parts';
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  features: {
    zh: string[];
    en: string[];
  };
  detailedFeatures?: {
    zh: string[];
    en: string[];
  };
  image: string;
  specs?: {
    zh: Record<string, string>;
    en: Record<string, string>;
  };
  models?: {
    title?: {
      zh: string;
      en: string;
    };
    headers: {
      zh: string[];
      en: string[];
    };
    rows: string[][];
  }[];
}

export const products: Product[] = [
  // Marine Compressors
  {
    id: 'marine-air-cooled',
    category: 'marine',
    title: {
      zh: '风冷型船用压缩机',
      en: 'Air-Cooled Marine Compressor'
    },
    description: {
      zh: '专为淡水资源受限或简化管路设计的船舶打造，无需外接冷却水，安装便捷，维护成本低，特别适合近海作业船舶、游艇及特种工程船。',
      en: 'Designed for vessels with limited fresh water resources or simplified piping. No external cooling water required, easy installation, low maintenance cost. Ideal for coastal vessels, yachts and special engineering ships.'
    },
    features: {
      zh: [
        '免冷却水设计：采用高效翅片散热器，无需外接冷却水系统',
        '高效节能：优化的气缸布局与进排气系统，确保高容积效率',
        '紧凑结构：V型/W型气缸布局，占地面积小'
      ],
      en: [
        'No cooling water required: High-efficiency finned radiator',
        'Energy efficient: Optimized cylinder layout and intake/exhaust system',
        'Compact structure: V/W type cylinder layout, small footprint'
      ]
    },
    detailedFeatures: {
      zh: [
        '排气压力：3.0 MPa',
        '排气量范围：14.3 - 300 m³/h',
        '冷却方式：高效风冷',
        '驱动方式：电机直联或皮带传动',
        '润滑方式：飞溅润滑或压力润滑',
        '安装形式：底座安装或减震安装',
        '控制方式：全自动启停控制',
        '适用环境温度：-5℃ ~ +55℃'
      ],
      en: [
        'Discharge Pressure: 3.0 MPa',
        'Capacity Range: 14.3 - 300 m³/h',
        'Cooling Method: High-efficiency Air Cooling',
        'Drive Type: Direct Coupling or Belt Drive',
        'Lubrication: Splash or Pressure Lubrication',
        'Mounting: Base or Shock Absorber Mounting',
        'Control: Fully Automatic Start/Stop',
        'Ambient Temp: -5℃ ~ +55℃'
      ]
    },
    image: '/images/products/marine_air_cooled.webp',
    specs: {
      zh: {
        '排气量': '14.3 - 300 m³/h',
        '排气压力': '3.0 MPa',
        '冷却方式': '风冷',
        '驱动方式': '电机 / 柴油机'
      },
      en: {
        'Capacity': '14.3 - 300 m³/h',
        'Pressure': '3.0 MPa',
        'Cooling': 'Air Cooled',
        'Drive': 'Electric Motor / Diesel Engine'
      }
    },
    models: [
      {
        title: {
          zh: '风冷1型主压缩机',
          en: 'Air-Cooled Type 1 Main Compressor'
        },
        headers: {
          zh: ['型号', '压力 (MPa)', '级数', '转速50Hz', '转速60Hz', '排气量 (m³/h)', '轴功率 (kW)', '电机功率 (kW)', '冷却风量 (L/min)', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Pressure (MPa)', 'Stages', 'Speed 50Hz', 'Speed 60Hz', 'Capacity (m³/h)', 'Shaft Power (kW)', 'Motor Power (kW)', 'Cooling Air (L/min)', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['WP18L', '3', '2', '-', '1150', '14.3', '3.2', '4(132M1)', '14', '900×640×540', '170'],
          ['WP18L', '3', '2', '1450', '-', '18', '3.8', '5.5(132S)', '18', '880×640×540', '160'],
          ['WP18L', '3', '2', '-', '1750', '22', '4.8', '5.5(132S)', '22', '880×640×540', '160'],
          ['WP25L', '3', '2', '-', '1150', '20', '4.2', '5.5(132M2)', '19', '920×640×540', '170'],
          ['WP25L', '3', '2', '1450', '-', '24.5', '5.4', '7.5(132M)', '25', '920×640×540', '170'],
          ['WP25L', '3', '2', '-', '1750', '30.5', '6.4', '7.5(132M)', '30', '920×640×540', '170'],
          ['WP32L', '3', '2', '-', '1150', '25', '5.6', '7.5(160M2)', '25', '1020×640×540', '210'],
          ['WP32L', '3', '2', '1450', '-', '31.5', '6.8', '7.5(132M)', '31', '920×640×540', '170'],
          ['WP32L', '3', '2', '-', '1750', '38', '8.2', '11(160M)', '39', '1020×640×540', '210']
        ]
      },
      {
        title: {
          zh: '风冷2型主压缩机',
          en: 'Air-Cooled Type 2 Main Compressor'
        },
        headers: {
          zh: ['型号', '压力 (MPa)', '级数', '转速50Hz', '转速60Hz', '排气量 (m³/h)', '轴功率 (kW)', '电机功率 (kW)', '冷却风量 (L/min)', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Pressure (MPa)', 'Stages', 'Speed 50Hz', 'Speed 60Hz', 'Capacity (m³/h)', 'Shaft Power (kW)', 'Motor Power (kW)', 'Cooling Air (L/min)', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['NWP40L', '3', '2', '970', '-', '26', '5.6', '7.5(160M)', '26', '1270×750×850', '370'],
          ['NWP40L', '3', '2', '-', '1150', '30.5', '6.6', '7.5(160M)', '31', '1270×750×850', '370'],
          ['NWP40L', '3', '2', '1450', '-', '39', '8.3', '11(160M)', '38', '1270×750×850', '370'],
          ['NWP40L', '3', '2', '-', '1750', '45', '10.1', '11(160M)', '47', '1270×750×850', '370'],
          ['NWP50L', '3', '2', '970', '-', '32', '7.2', '7.5(160M)', '32', '1270×750×850', '370'],
          ['NWP50L', '3', '2', '-', '1150', '38', '8.5', '11(160L)', '39', '1320×750×850', '400'],
          ['NWP50L', '3', '2', '1450', '-', '48.5', '10.5', '11(160M)', '49', '1270×750×850', '370'],
          ['NWP50L', '3', '2', '-', '1750', '58.5', '12.7', '15(160L)', '59', '1320×750×850', '400'],
          ['NWP62L', '3', '2', '970', '-', '38', '8.3', '11(160L)', '39', '1320×750×850', '400'],
          ['NWP62L', '3', '2', '-', '1150', '46', '9.8', '11(160L)', '45', '1320×750×850', '400'],
          ['NWP62L', '3', '2', '1450', '-', '58', '12.5', '15(160L)', '58', '1320×750×850', '400'],
          ['NWP62L', '3', '2', '-', '1750', '70', '15.1', '18.5(180M)', '70', '1360×750×850', '450']
        ]
      },
      {
        title: {
          zh: '风冷3型主压缩机',
          en: 'Air-Cooled Type 3 Main Compressor'
        },
        headers: {
          zh: ['型号', '压力 (MPa)', '级数', '转速50Hz', '转速60Hz', '排气量 (m³/h)', '轴功率 (kW)', '电机功率 (kW)', '冷却风量 (L/min)', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Pressure (MPa)', 'Stages', 'Speed 50Hz', 'Speed 60Hz', 'Capacity (m³/h)', 'Shaft Power (kW)', 'Motor Power (kW)', 'Cooling Air (L/min)', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['WP80L', '3', '3', '-', '1170', '64', '13', '15(180L)', '60', '1340×750×850', '480'],
          ['WP80L', '3', '3', '1470', '-', '80', '15', '18.5(180M)', '69', '1380×750×850', '480'],
          ['WP100L', '3', '3', '-', '1170', '78', '16', '18.5(200L1)', '74', '1350×880×1090', '600'],
          ['WP100L', '3', '3', '1470', '-', '99', '20', '22(180L)', '88', '1310×880×1090', '550'],
          ['WP120L', '3', '3', '-', '1170', '98', '19', '22(200L2)', '88', '1350×880×1090', '600'],
          ['WP120L', '3', '3', '1470', '-', '121', '24', '30(200L)', '116', '1310×880×1090', '600'],
          ['WP150L', '3', '3', '-', '1170', '117', '23', '30(225M)', '111', '1420×880×1090', '680'],
          ['WP150L', '3', '3', '1470', '-', '150', '30', '37(225S)', '148', '1400×880×1090', '650'],
          ['WP250L', '3', '3', '-', '1170', '180', '37', '45(280S)', '180', '2120×930×1120', '870'],
          ['WP250L', '3', '3', '1470', '-', '225', '44', '45(225M)', '217', '1590×930×1120', '680'],
          ['WP300L', '3', '3', '-', '1170', '240', '44', '45(280S)', '203', '2120×930×1120', '870'],
          ['WP300L', '3', '3', '1470', '-', '300', '56', '75(280S)', '259', '2120×930×1120', '870']
        ]
      }
    ]
  },
  {
    id: 'marine-water-cooled',
    category: 'marine',
    title: {
      zh: '水冷型船用压缩机',
      en: 'Water-Cooled Marine Compressor'
    },
    description: {
      zh: '采用水冷散热设计的船用往复活塞式压缩机，利用船舶海水或淡水冷却系统进行散热。 散热效率高，适合大功率长期连续运行工况，是大中型船舶主辅机配套的理想选择。',
      en: 'Water-cooled reciprocating piston marine compressor designed for high heat dissipation efficiency using ship seawater or fresh water cooling systems. Ideal for high-power continuous operation in large and medium-sized vessels.'
    },
    features: {
      zh: [
        '高效水冷设计: 采用船舶海水/淡水冷却系统，散热效率高',
        '运行稳定可靠: 优化的气缸布局与冷却系统，确保高容积效率',
        '大功率输出: V型/W型气缸布局，结构紧凑，适合大中型船舶'
      ],
      en: [
        'High efficiency water cooling: Uses ship seawater/freshwater system',
        'Stable and reliable: Optimized cylinder layout and cooling system',
        'High power output: V/W type cylinder layout, compact structure'
      ]
    },
    detailedFeatures: {
      zh: [
        '排气压力：3.0 MPa',
        '排气量范围：54 - 324 m³/h',
        '冷却方式：海水或淡水冷却',
        '驱动方式：电机直联',
        '润滑方式：压力润滑',
        '控制方式：全自动启停控制',
        '适用船舶：远洋船舶、大型工程船',
        '认证：CCS, DNV, BV, LR等船级社认证'
      ],
      en: [
        'Discharge Pressure: 3.0 MPa',
        'Capacity Range: 54 - 324 m³/h',
        'Cooling Method: Seawater or Freshwater',
        'Drive Type: Direct Coupling',
        'Lubrication: Pressure Lubrication',
        'Control: Fully Automatic Start/Stop',
        'Application: Ocean-going vessels, Large engineering ships',
        'Certificates: CCS, DNV, BV, LR, etc.'
      ]
    },
    image: '/images/products/marine_water_cooled.webp',
    specs: {
      zh: {
        '排气量': '54 - 324 m³/h',
        '排气压力': '3.0 MPa',
        '冷却方式': '水冷 (海水/淡水)',
        '适用船舶': '大中型船舶主辅机配套'
      },
      en: {
        'Capacity': '54 - 324 m³/h',
        'Pressure': '3.0 MPa',
        'Cooling': 'Water Cooled (Sea/Fresh)',
        'Application': 'Main/Auxiliary engine support for large vessels'
      }
    },
    models: [
      {
        headers: {
          zh: ['型号', '排气压力 (MPa)', '级数', '转速 (r/min)', '容积流量 (m³/h)', '轴功率 (kW)', '电机功率 (kW)', '冷却水 (L/min)', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Pressure (MPa)', 'Stages', 'Speed (r/min)', 'Capacity (m³/h)', 'Shaft Power (kW)', 'Motor Power (kW)', 'Cooling Water (L/min)', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['WP60', '3', '2', '970', '54', '13', '15', '8', '1280×680×960', '500'],
          ['WP60', '3', '2', '1170', '68', '14.5', '15', '9.5', '1280×680×960', '500'],
          ['WP60', '3', '2', '1450', '84', '18', '18.5', '12', '1350×680×960', '500'],
          ['WP110', '3', '2', '970', '91', '20', '22', '13.5', '1425×840×1370', '900'],
          ['WP110', '3', '2', '1170', '110', '24', '30', '16.5', '1550×840×1370', '1000'],
          ['WP110', '3', '2', '1450', '135', '29.5', '30', '20.5', '1425×840×1370', '900'],
          ['WP135', '3', '2', '870', '106', '21', '22', '14.5', '1550×840×1370', '1000'],
          ['WP135', '3', '2', '970', '118', '23.5', '30', '16', '1550×840×1370', '1000'],
          ['WP135', '3', '2', '1170', '142', '28.5', '30', '19.5', '1550×840×1370', '1000'],
          ['WP135', '3', '2', '1450', '174', '36', '45', '25', '1550×840×1370', '1000'],
          ['WP160', '3', '2', '870', '125', '25', '30', '17', '1550×840×1370', '1000'],
          ['WP160', '3', '2', '970', '140', '28', '37', '19', '1550×840×1370', '1000'],
          ['WP160', '3', '2', '1170', '168', '33.5', '37', '23', '1550×840×1370', '1000'],
          ['WP160', '3', '2', '1450', '205', '42', '45', '28', '1550×840×1370', '1000'],
          ['WP185', '3', '2', '870', '148', '29.5', '37', '20', '1700×940×1400', '1100'],
          ['WP185', '3', '2', '970', '165', '33', '45', '22.5', '1700×940×1400', '1100'],
          ['WP185', '3', '2', '1170', '198', '40', '45', '27', '1700×940×1400', '1100'],
          ['NWP180', '3', '2', '970', '168', '32.5', '45', '23', '1700×940×1400', '1200'],
          ['NWP180', '3', '2', '1170', '202', '39.5', '45', '27.5', '1700×940×1400', '1200'],
          ['NWP180', '3', '2', '1450', '248', '48.5', '55', '34', '1700×940×1400', '1200'],
          ['WP220', '3', '2', '970', '200', '39', '55', '27.5', '1850×1040×1480', '1400'],
          ['WP220', '3', '2', '1170', '240', '47', '55', '33', '1850×1040×1480', '1400'],
          ['WP220', '3', '2', '1450', '295', '58', '75', '40.5', '1850×1040×1480', '1400'],
          ['WP270', '3', '2', '870', '210', '41.5', '55', '29', '1850×1040×1480', '1400'],
          ['WP270', '3', '2', '970', '235', '47', '55', '32', '1850×1040×1480', '1400'],
          ['WP270', '3', '2', '1170', '282', '56.5', '75', '39', '1850×1040×1480', '1400'],
          ['WP270', '3', '2', '1450', '324', '65', '75', '48', '1850×1040×1480', '1400']
        ]
      }
    ]
  },
  {
    id: 'marine-high-pressure',
    category: 'marine',
    title: {
      zh: '高压船用压缩机',
      en: 'High-Pressure Marine Compressor'
    },
    description: {
      zh: '多级压缩技术，提供高达30MPa的排气压力，适用于军舰、科考船及特殊工程船舶的高压空气系统。',
      en: 'Multi-stage compression technology providing discharge pressure up to 30MPa. Suitable for high-pressure air systems in warships, research vessels and special engineering ships.'
    },
    features: {
      zh: [
        '高压稳定输出: 多级压缩，排气压力高达30MPa',
        '安全可靠: 配备完善的安全阀与监控系统',
        '船级社认证: 符合CCS及国际船级社规范'
      ],
      en: [
        'High pressure output: Multi-stage compression up to 30MPa',
        'Safe and reliable: Equipped with safety valves and monitoring system',
        'Certified: Compliant with CCS and international classification societies'
      ]
    },
    detailedFeatures: {
      zh: [
        '排气压力：30.0 MPa',
        '排气量范围：10 - 50 m³/h',
        '冷却方式：水冷',
        '级数：3级或4级压缩',
        '驱动方式：电机直联',
        '控制方式：PLC自动控制',
        '适用介质：空气、氮气',
        '应用领域：舰船高压气源、水下发射系统'
      ],
      en: [
        'Discharge Pressure: 30.0 MPa',
        'Capacity Range: 10 - 50 m³/h',
        'Cooling Method: Water Cooled',
        'Stages: 3 or 4 Stage Compression',
        'Drive Type: Direct Coupling',
        'Control: PLC Automatic Control',
        'Media: Air, Nitrogen',
        'Application: Naval high-pressure air, Underwater launch systems'
      ]
    },
    image: '/images/products/marine_high_pressure.webp',
    specs: {
      zh: {
        '排气量': '10 - 50 m³/h',
        '排气压力': '30.0 MPa',
        '冷却方式': '水冷',
        '级数': '3-4级'
      },
      en: {
        'Capacity': '10 - 50 m³/h',
        'Pressure': '30.0 MPa',
        'Cooling': 'Water Cooled',
        'Stages': '3-4 Stages'
      }
    },
    models: [
      {
        headers: {
          zh: ['型号', '排气压力 (MPa)', '级数', '转速 (r/min)', '排气量 (m³/h)', '轴功率 (kW)', '电机功率 (kW)', '冷却方式', '外形尺寸 (mm)'],
          en: ['Model', 'Pressure (MPa)', 'Stages', 'Speed (r/min)', 'Capacity (m³/h)', 'Shaft Power (kW)', 'Motor Power (kW)', 'Cooling', 'Dimensions (mm)']
        },
        rows: [
          ['SF-HP-300-25', '2.5', '3', '1450', '180', '32', '37', '水冷', '1800×1200×1400'],
          ['SF-HP-500-30', '3.0', '3', '1450', '300', '48', '55', '水冷', '2000×1400×1500'],
          ['SF-HP-750-30', '3.0', '3', '1450', '450', '78', '90', '水冷', '2200×1500×1600'],
          ['SF-HP-1000-30', '3.0', '4', '1450', '600', '95', '110', '水冷', '2400×1600×1700'],
          ['SF-HP-1500-30', '3.0', '4', '1450', '900', '140', '160', '水冷', '2800×1800×1900']
        ]
      }
    ]
  },
  {
    id: 'marine-screw',
    category: 'marine',
    title: {
      zh: '螺杆式船用压缩机',
      en: 'Screw Marine Compressor'
    },
    description: {
      zh: '高效螺杆主机，低噪音低振动，适合对静音要求高的豪华邮轮及客滚船。连续运行稳定性极佳。',
      en: 'High-efficiency screw host, low noise and vibration. Suitable for luxury cruise ships and Ro-Ro passenger ships with high silence requirements. Excellent continuous operation stability.'
    },
    features: {
      zh: [
        '低噪音低振动: 优化的螺杆型线与隔音设计',
        '连续运行: 适合24小时不间断运行',
        '智能控制: PLC触摸屏控制，实时监控运行状态'
      ],
      en: [
        'Low noise/vibration: Optimized screw profile and sound insulation',
        'Continuous operation: Suitable for 24/7 non-stop operation',
        'Smart control: PLC touch screen control, real-time monitoring'
      ]
    },
    detailedFeatures: {
      zh: [
        '排气压力：0.7 - 1.3 MPa',
        '排气量范围：60 - 600 m³/h',
        '冷却方式：风冷或水冷',
        '驱动方式：电机直联或皮带传动',
        '噪音等级：< 75 dB(A)',
        '含油量：< 3 ppm',
        '控制系统：微电脑智能控制器',
        '维护周期：长达4000-8000小时'
      ],
      en: [
        'Discharge Pressure: 0.7 - 1.3 MPa',
        'Capacity Range: 60 - 600 m³/h',
        'Cooling Method: Air or Water Cooled',
        'Drive Type: Direct Coupling or Belt Drive',
        'Noise Level: < 75 dB(A)',
        'Oil Content: < 3 ppm',
        'Control System: Microcomputer Intelligent Controller',
        'Maintenance Interval: 4000-8000 hours'
      ]
    },
    image: '/images/products/marine_screw.webp',
    specs: {
      zh: {
        '排气量': '60 - 600 m³/h',
        '排气压力': '0.7 - 1.3 MPa',
        '冷却方式': '风冷 / 水冷',
        '噪音': '< 75 dB(A)'
      },
      en: {
        'Capacity': '60 - 600 m³/h',
        'Pressure': '0.7 - 1.3 MPa',
        'Cooling': 'Air / Water Cooled',
        'Noise': '< 75 dB(A)'
      }
    },
    models: [
      {
        headers: {
          zh: ['型号', '容积流量 (m³/min)', '排气压力 (MPa)', '电机功率 (kW)', '出口管径', '冷却方式', '传动方式', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Capacity (m³/min)', 'Pressure (MPa)', 'Motor Power (kW)', 'Outlet', 'Cooling', 'Drive', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['SF-SCR-800', '8.0', '0.7-0.8', '55', 'DN50', '风冷/水冷', '直联', '1800×1200×1500', '1200'],
          ['SF-SCR-1200', '12.0', '0.7-1.0', '75', 'DN65', '风冷/水冷', '直联', '2000×1400×1600', '1600'],
          ['SF-SCR-1800', '18.0', '0.8-1.0', '110', 'DN80', '风冷/水冷', '直联', '2200×1500×1700', '2100'],
          ['SF-SCR-2500', '25.0', '0.8-1.2', '160', 'DN100', '风冷/水冷', '直联', '2500×1600×1800', '2800'],
          ['SF-SCR-3500', '35.0', '1.0-1.3', '220', 'DN125', '风冷/水冷', '直联', '2800×1800×2000', '3500']
        ]
      }
    ]
  },
  {
    id: 'marine-emergency',
    category: 'marine',
    title: {
      zh: '应急压缩机',
      en: 'Emergency Compressor'
    },
    description: {
      zh: '符合SOLAS公约要求，具备独立动力源（柴油机或手动），确保在全船失电情况下仍能提供起动空气。',
      en: 'Compliant with SOLAS convention requirements. Equipped with independent power source (diesel engine or manual) to ensure starting air supply in case of total ship power failure.'
    },
    features: {
      zh: [
        '独立动力: 柴油机驱动或手动操作，不依赖船舶电网',
        '快速启动: 结构简单，启动迅速，响应时间短',
        'SOLAS合规: 符合国际海上人命安全公约要求'
      ],
      en: [
        'Independent power: Diesel driven or manual, independent of ship grid',
        'Fast start: Simple structure, quick start, short response time',
        'SOLAS compliant: Meets International Convention for Safety of Life at Sea'
      ]
    },
    detailedFeatures: {
      zh: [
        '排气压力：3.0 MPa',
        '排气量范围：14.3 - 38 m³/h',
        '冷却方式：风冷',
        '驱动方式：柴油机驱动 / 手动',
        '启动方式：手摇启动 / 电启动',
        '燃油箱容量：满足运行要求',
        '移动性：可选配移动底座',
        '认证：CCS船级社认证'
      ],
      en: [
        'Discharge Pressure: 3.0 MPa',
        'Capacity Range: 14.3 - 38 m³/h',
        'Cooling Method: Air Cooled',
        'Drive Type: Diesel Engine / Manual',
        'Start Method: Hand Crank / Electric Start',
        'Fuel Tank: Sufficient for operation',
        'Mobility: Optional mobile base',
        'Certification: CCS Classification'
      ]
    },
    image: '/images/products/marine_emergency.webp',
    specs: {
      zh: {
        '排气量': '14.3 - 38 m³/h',
        '排气压力': '3.0 MPa',
        '驱动方式': '柴油机 / 手动',
        '冷却方式': '风冷'
      },
      en: {
        'Capacity': '14.3 - 38 m³/h',
        'Pressure': '3.0 MPa',
        'Drive': 'Diesel / Manual',
        'Cooling': 'Air Cooled'
      }
    },
    models: [
      {
        title: {
          zh: '柴油机驱动应急压缩机',
          en: 'Diesel Driven Emergency Compressor'
        },
        headers: {
          zh: ['型号', '压力 (MPa)', '级数', '转速 (r/min)', '排气量 (m³/h)', '柴油机功率 (kW)', '传动方式', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Pressure (MPa)', 'Stages', 'Speed (r/min)', 'Capacity (m³/h)', 'Diesel Power (kW)', 'Drive', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['WP18L', '3.0', '2', '1450', '18', '6.3', '皮带', '850x730x700', '180'],
          ['WP25L', '3.0', '2', '1450', '25', '6.3', '皮带', '850x730x700', '180']
        ]
      },
      {
        title: {
          zh: '手动应急压缩机',
          en: 'Manual Emergency Compressor'
        },
        headers: {
          zh: ['型号', '压力 (MPa)', '级数', '手摇转速 (r/min)', '排气量 (m³/h)', '驱动方式', '冷却方式', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Pressure (MPa)', 'Stages', 'Crank Speed (r/min)', 'Capacity (m³/h)', 'Drive', 'Cooling', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['H-6', '3.0', '2', '45', '0.36', '手动', '风冷', '600×400×500', '45']
        ]
      }
    ]
  },

  // Industrial Compressors
  {
    id: 'industrial-d',
    category: 'industrial',
    title: {
      zh: '工艺D型压缩机',
      en: 'Process D-Series Compressor'
    },
    description: {
      zh: '采用对称平衡型设计，具有优异的动力平衡性能，适用于氢气、氮气、合成气等清洁气体的中高压压缩，广泛应用于石化加氢、合成氨等工艺流程。',
      en: 'Symmetrical balanced design with excellent dynamic balance performance. Suitable for medium and high pressure compression of clean gases such as hydrogen, nitrogen, and syngas. Widely used in petrochemical hydrogenation, ammonia synthesis and other processes.'
    },
    features: {
      zh: [
        '动力平衡: 对称平衡型设计，振动极小',
        '高压大排量: 适合中高压、大流量工艺流程',
        '多介质适用: 可压缩氢气、氮气、天然气等多种介质'
      ],
      en: [
        'Dynamic balance: Symmetrical balanced design, minimal vibration',
        'High pressure/capacity: Suitable for medium/high pressure, large flow',
        'Multi-media: Compress hydrogen, nitrogen, natural gas, etc.'
      ]
    },
    detailedFeatures: {
      zh: [
        '排气压力：高达 32.0 MPa',
        '排气量范围：100 - 8000 m³/h',
        '压缩级数：1-5级',
        '润滑方式：无油润滑或少油润滑',
        '冷却方式：水冷',
        '驱动方式：电机或透平驱动',
        '密封形式：填料密封，可选充氮保护',
        '防爆等级：Ex d II BT4 / CT4'
      ],
      en: [
        'Discharge Pressure: Up to 32.0 MPa',
        'Capacity Range: 100 - 8000 m³/h',
        'Compression Stages: 1-5 Stages',
        'Lubrication: Oil-free or Low-oil',
        'Cooling Method: Water Cooled',
        'Drive Type: Motor or Turbine',
        'Sealing: Packing seal, optional nitrogen purge',
        'Explosion Proof: Ex d II BT4 / CT4'
      ]
    },
    image: '/images/products/industrial_process_d.webp',
    specs: {
      zh: {
        '排气量': '100 - 8000 m³/h',
        '排气压力': '高达 32.0 MPa',
        '适用介质': '氢气、氮气、天然气等',
        '结构形式': '对称平衡型'
      },
      en: {
        'Capacity': '100 - 8000 m³/h',
        'Pressure': 'Up to 32.0 MPa',
        'Media': 'H2, N2, NG, etc.',
        'Structure': 'Symmetrical Balanced'
      }
    },
    models: [
      {
        headers: {
          zh: ['型号', '排气量 (m³/min)', '进气压力 (MPa)', '排气压力 (MPa)', '电机功率 (kW)', '外型尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Displacement (m³/min)', 'Inlet Pres. (MPa)', 'Outlet Pres. (MPa)', 'Motor Power (kW)', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['DW-15/0.05-7', '15', '0.005', '0.7', '110', '4392×950×1200', '5000'],
          ['DW-4.5/10-25', '4.5', '1', '2.5', '130', '4510×950×1200', '4000'],
          ['DW-6.5/7-16', '6.5', '0.7', '1.6', '132', '4400×950×800', '4000'],
          ['DW-21/0.05-6', '21', '0.005', '0.6', '132', '4350×1570×1620', '6000'],
          ['DW-3.7/4-98', '3.7', '0.4', '9.8', '185', '4155×1570×1620', '6000'],
          ['DW-23/0.05-8', '23', '0.005', '0.8', '185', '4189×1300×1415', '5000'],
          ['DW-6.5/30-40', '6.5', '3', '4', '186', '4192×1300×1415', '10000'],
          ['DW-6.7/10-26', '6.7', '1', '2.6', '200', '4533×1510×1220', '5000'],
          ['DW-21/0.5-12', '21', '0.05', '1.2', '200', '4189×1300×1415', '5000'],
          ['DW-22/1.8-9', '22', '0.18', '0.9', '250', '4269×1300×1415', '5000'],
          ['DW-41/0.08-6', '41', '0.02', '0.6', '250', '4350×1600×1650', '6200'],
          ['D-28N/15', '28N', '-', '1.5', '250', '3690×1300×1255', '5000'],
          ['DW-6.1/5-50', '6.1', '0.5', '5', '280', '4730×1730×1400', '5000'],
          ['DW-27/27-29', '27', '2.7', '2.9', '280', '4445×1533×1965', '13000'],
          ['DW-50/0.03-5.5', '50', '0.003', '0.55', '280', '4791×1670×1400', '6000'],
          ['DW-30/0.02-30', '30', '0.002', '3', '315', '5497×1818×2106', '13000'],
          ['DW-34/0.6-9', '34', '0.06', '0.9', '315', '5600×1818×1400', '11000'],
          ['DW-120/2', '120', '-', '0.2', '350', '4665×1900×1516', '11000'],
          ['D-35/0.1-17', '35', '0.01', '1.7', '355', '5100×1820×1800', '10000'],
          ['DW-39/0.5-9', '39', '0.05', '0.9', '355', '5490×1818×1400', '13000'],
          ['DW-42/0.05-14', '42', '0.005', '1.4', '355', '5090×1818×1755', '11000'],
          ['DW-60/6', '60', '-', '0.6', '355', '4580×1960×1740', '11000'],
          ['DW-60/8', '60', '-', '0.8', '355', '4580×1960×1740', '11000'],
          ['DW-50/2.5-6.5', '50', '0.25', '0.65', '400', '5310×1960×1740', '12000'],
          ['DW-94/0.2-3', '94', '0.02', '0.3', '400', '5600×1818×1400', '11000'],
          ['DW-100/3', '100', '-', '0.3', '400', '6000×3341×3983', '12000'],
          ['DW-110/0.15-2.3-G', '110', '0.015', '0.23', '400', '5710×2820×2055', '11000'],
          ['D-150/1.5-G', '150', '-', '0.15', '400', '4730×2110×1625', '12000'],
          ['D-200/1', '200', '-', '0.1', '400', '4850×2115×1960', '13000'],
          ['DW-150/0.07-2', '150', '0.007', '0.2', '450', '5372×2960×2150', '11000'],
          ['DW-138/1.5-3', '138', '0.15', '0.3', '500', '5710×2250×1420', '12000'],
          ['DW-60/5-9', '60', '0.5', '0.9', '550', '5738×1880×1420', '12000'],
          ['D-100/5', '100', '-', '0.5', '550', '4640×3156×3400', '12000'],
          ['D-210/1.5-G', '210', '-', '0.15', '550', '4850×2115×1960', '13000'],
          ['DW-190/0.05-1.75', '190', '0.005', '0.175', '560', '6913×3393×3954', '11000'],
          ['DW-61/2.2-8.8', '61', '0.22', '0.88', '630', '5800×2250×3080', '12000'],
          ['DW-78/0.23-17.5', '78', '0.023', '1.75', '630', '7250×2578×1600', '19000'],
          ['D-200/2', '200', '-', '0.2', '630', '4850×2115×1960', '13000'],
          ['DW-122/0.2-7', '122', '0.02', '0.6', '710', '7250×2578×1600', '24000']
        ]
      }
    ]
  },
  {
    id: 'industrial-m',
    category: 'industrial',
    title: {
      zh: '工艺M型压缩机',
      en: 'Process M-Series Compressor'
    },
    description: {
      zh: '模块化紧凑设计，占地面积小，安装灵活便捷。专为中小流量工艺气体压缩优化，适用于精细化工、制药、食品等行业的洁净气体输送与增压。',
      en: 'Modular compact design, small footprint, flexible installation. Optimized for small and medium flow process gas compression. Suitable for clean gas transmission and boosting in fine chemical, pharmaceutical, food and other industries.'
    },
    features: {
      zh: [
        '紧凑模块化: 占地小，安装方便',
        '洁净传输: 适合对气体纯度有要求的场合',
        '运行灵活: 适应中小流量工况波动'
      ],
      en: [
        'Compact modular: Small footprint, easy installation',
        'Clean transmission: Suitable for high purity requirements',
        'Flexible operation: Adapts to flow fluctuations'
      ]
    },
    detailedFeatures: {
      zh: [
        '排气压力：高达 10.0 MPa',
        '排气量范围：20 - 1000 m³/h',
        '压缩级数：1-3级',
        '润滑方式：无油润滑',
        '冷却方式：风冷或水冷',
        '驱动方式：皮带传动或直联',
        '安装方式：撬装式设计',
        '适用行业：制药、食品、电子'
      ],
      en: [
        'Discharge Pressure: Up to 10.0 MPa',
        'Capacity Range: 20 - 1000 m³/h',
        'Compression Stages: 1-3 Stages',
        'Lubrication: Oil-free',
        'Cooling Method: Air or Water Cooled',
        'Drive Type: Belt or Direct',
        'Installation: Skid-mounted',
        'Industries: Pharma, Food, Electronics'
      ]
    },
    image: '/images/products/industrial_process_m.webp',
    specs: {
      zh: {
        '排气量': '20 - 1000 m³/h',
        '排气压力': '高达 10.0 MPa',
        '适用介质': '惰性气体、特种气体',
        '结构形式': 'M型模块化'
      },
      en: {
        'Capacity': '20 - 1000 m³/h',
        'Pressure': 'Up to 10.0 MPa',
        'Media': 'Inert gases, Special gases',
        'Structure': 'M-Type Modular'
      }
    },
    models: [
      {
        headers: {
          zh: ['型号', '排气量 (m³/min)', '进气压力 (MPa)', '排气压力 (MPa)', '电机功率 (kW)', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Displacement (m³/min)', 'Inlet Pres. (MPa)', 'Discharge Pres. (MPa)', 'Motor Power (kW)', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['MW-28/0.04-20', '28', '0.004', '2', '220', '4360×2400×1245', '30000'],
          ['MW-51/0.08-24', '51', '0.008', '2.4', '500', '6030×3050×1500', '19500'],
          ['MW-27/1.8-40', '27', '0.18', '4', '550', '6260×3050×1500', '21000'],
          ['MW-75/0.07-25', '75', '0.007', '2.5', '710', '6130×3050×1500', '21000'],
          ['MW-105/40', '105', '-', '4', '1000', '6736×3736×1700', '6500']
        ]
      }
    ]
  },
  {
    id: 'industrial-z',
    category: 'industrial',
    title: {
      zh: '工艺Z型压缩机',
      en: 'Process Z-Series Compressor'
    },
    description: {
      zh: '采用无油润滑技术，确保压缩气体零污染。特别适用于对气体纯度要求极高的场合，如电子级气体、医用氧气、食品级二氧化碳等特种气体压缩。',
      en: 'Uses oil-free lubrication technology to ensure zero contamination of compressed gas. Especially suitable for applications with extremely high gas purity requirements, such as electronic grade gases, medical oxygen, food grade CO2, etc.'
    },
    features: {
      zh: [
        '全无油设计: 气缸无油润滑，保证气体纯度',
        '结构紧凑: 立式结构，节省占地面积',
        '高安全性: 适合压缩氧气等活性气体'
      ],
      en: [
        'Oil-free design: Oil-free cylinder, ensures gas purity',
        'Vertical structure: Saves space, reasonable force distribution',
        'High safety: Suitable for compressing active gases like oxygen'
      ]
    },
    detailedFeatures: {
      zh: [
        '排气压力：高达 4.0 MPa',
        '排气量范围：50 - 2000 m³/h',
        '压缩级数：1-3级',
        '润滑方式：全无油润滑',
        '冷却方式：水冷',
        '密封材料：填充聚四氟乙烯(PTFE)',
        '适用介质：氧气、高纯氮气、氩气',
        '特点：低转速，长寿命'
      ],
      en: [
        'Discharge Pressure: Up to 4.0 MPa',
        'Capacity Range: 50 - 2000 m³/h',
        'Compression Stages: 1-3 Stages',
        'Lubrication: Totally Oil-free',
        'Cooling Method: Water Cooled',
        'Sealing Material: Filled PTFE',
        'Media: Oxygen, High Purity N2, Ar',
        'Features: Low speed, Long life'
      ]
    },
    image: '/images/products/industrial_process_z.webp',
    specs: {
      zh: {
        '排气量': '50 - 2000 m³/h',
        '排气压力': '高达 4.0 MPa',
        '适用介质': '氧气、高纯气体',
        '结构形式': 'Z型立式'
      },
      en: {
        'Capacity': '50 - 2000 m³/h',
        'Pressure': 'Up to 4.0 MPa',
        'Media': 'Oxygen, High Purity Gases',
        'Structure': 'Z-Type Vertical'
      }
    },
    models: [
      {
        headers: {
          zh: ['型号', '排气量 (m³/min)', '进气压力 (MPa)', '排气压力 (MPa)', '电机功率 (kW)', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Displacement (m³/min)', 'Inlet Pres. (MPa)', 'Discharge Pres. (MPa)', 'Motor Power (kW)', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['ZW-2.3/0.02-3.5', '0.02', '0.02', '0.35', '11', '1490×850×1740', '800'],
          ['ZW-0.27/6-30', '6', '0.027', '3', '11', '2075×740×1780', '1100'],
          ['ZW-0.35/28-31', '28', '0.035', '3.1', '11', '1354×860×1780', '800'],
          ['ZW-0.35/7-20', '7', '0.035', '2', '11', '698×494×1630', '1100'],
          ['ZW-60N/0.5-8', '0.5', '0.05', '0.8', '11', '1466×1038×1740', '1100'],
          ['ZW-0.5/2-15', '2', '0.05', '2.4', '11', '1872×704×1780', '1100'],
          ['ZW-0.6/4.7-7', '4.7', '0.06', '0.7', '11', '1466×826×1740', '1000'],
          ['ZW-1.17/13.5-16', '13.5', '0.0117', '1.6', '15', '1546×1096×1830', '1100'],
          ['ZW-1.9/0.1-3', '0.1', '0.019', '0.3', '15', '827×764×1818', '800'],
          ['ZW-0.26/5-30', '5', '0.026', '3', '15', '710×490×1630', '1000'],
          ['ZW-0.3/5-40', '5', '0.03', '4', '15', '710×490×1630', '1000'],
          ['ZW-0.42/7.5-21', '7.5', '0.042', '2.1', '15', '770×1396×1750', '800'],
          ['ZW-0.5/16-24', '16', '0.05', '2.4', '15', '698×494×1630', '1100'],
          ['ZW-0.5/16-24-A', '16', '0.05', '2.4', '15', '698×494×1630', '1100'],
          ['ZW-0.6/0.5-24', '0.5', '0.06', '2.4', '15', '1530×1190×1815', '1100'],
          ['ZW-1/0.5-8', '0.5', '0.1', '0.8', '15', '1300×703×1784', '800'],
          ['ZW-1/1-8', '1', '0.1', '0.8', '15', '1530×1100×1825', '1100'],
          ['ZW-1.6/8.5-11', '8.5', '0.16', '1.1', '15', '827×764×1818', '800'],
          ['ZW-1.75/0.04-8', '0.04', '0.175', '0.8', '15', '1470×870×1740', '800'],
          ['ZW-2.4/4-5.8', '4', '0.24', '0.58', '15', '1556×1297×1640', '1000'],
          ['ZW-2/1', '1', '-', '0.2', '15', '1394×703.5×1750', '800'],
          ['ZW-1.5/8', '8', '-', '0.15', '15', '1470×870×1740', '800'],
          ['ZW-0.42/8-25', '8', '0.042', '2.5', '18.5', '799×786×1620', '800'],
          ['ZW-0.45/4.8-30', '4.8', '0.045', '3', '18.5', '710×490×1630', '1000'],
          ['ZW-0.45/5-30', '5', '0.045', '3', '18.5', '710×490×1630', '1000'],
          ['ZW-0.5/4-18', '4', '0.05', '1.8', '18.5', '828.5×484×1629', '1100'],
          ['ZW-0.53/8.5-20', '8.5', '0.053', '2', '18.5', '1670×1125×1773', '1000'],
          ['ZW-0.6/4-20', '4', '0.06', '2', '18.5', '1670×1220×1780', '1100'],
          ['ZW-0.67/3-23.5', '3', '0.067', '2.35', '18.5', '1670×1220×1780', '1100'],
          ['ZW-0.67/7-16', '7', '0.067', '1.6', '18.5', '1700×947×1780', '1100'],
          ['ZW-0.73/3.45-22', '3.45', '0.073', '2.2', '18.5', '1670×1220×1780', '1100'],
          ['ZW-0.9/1-16', '1', '0.09', '1.6', '18.5', '830×490×1640', '1100'],
          ['ZW-1.5/0.02-10', '0.02', '0.15', '1', '18.5', '1500×950×1740', '-'],
          ['ZW-1.5/0.3-8', '0.3', '0.15', '0.8', '18.5', '1500×950×1840', '-'],
          ['ZW-1.5/0.5-8', '0.5', '0.15', '0.8', '18.5', '1500×950×1740', '800'],
          ['ZW-1.5/0.5-8-A', '0.8', '0.15', '8', '18.5', '1500×950×1740', '800'],
          ['ZW-1.6/0.15-8', '0.15', '0.16', '0.8', '18.5', '830×490×1640', '1000'],
          ['ZW-2.5/1.2-3.5', '1.2', '0.25', '0.35', '18.5', '1670×540×1790', '1000'],
          ['ZW-3.5/0.5-3.5', '0.5', '0.35', '0.35', '18.5', '830×490×1640', '1000'],
          ['ZW-3.55/0.3-2.55', '0.3', '0.355', '0.255', '18.5', '830×490×1640', '1000']
        ]
      }
    ]
  },
  {
    id: 'industrial-l',
    category: 'industrial',
    title: {
      zh: '工艺L型压缩机',
      en: 'Process L-Series Compressor'
    },
    description: {
      zh: '大排量重载型设计，适用于大型化工装置的主工艺气体压缩。具备处理腐蚀性、易燃易爆气体的能力，满足炼油、煤化工、天然气处理等大型项目需求。',
      en: 'Large displacement heavy-duty design, suitable for main process gas compression in large chemical plants. Capable of handling corrosive, flammable and explosive gases, meeting the needs of refining, coal chemical, natural gas processing and other large projects.'
    },
    features: {
      zh: [
        '重载设计: 适合连续重负荷运行',
        '大排量: 满足大型化工装置需求',
        '适应性强: 可处理复杂组分气体'
      ],
      en: [
        'Heavy duty: Suitable for continuous heavy load operation',
        'Large capacity: Meets large chemical plant needs',
        'Adaptable: Handles complex gas components'
      ]
    },
    detailedFeatures: {
      zh: [
        '排气压力：高达 20.0 MPa',
        '排气量范围：500 - 5000 m³/h',
        '压缩级数：1-4级',
        '润滑方式：压力润滑',
        '冷却方式：水冷',
        '结构特点：L型直角布置',
        '适用介质：天然气、煤气、氨气',
        '应用：加气站、化肥厂'
      ],
      en: [
        'Discharge Pressure: Up to 20.0 MPa',
        'Capacity Range: 500 - 5000 m³/h',
        'Compression Stages: 1-4 Stages',
        'Lubrication: Pressure Lubrication',
        'Cooling Method: Water Cooled',
        'Structure: L-Type Right Angle',
        'Media: Natural Gas, Coal Gas, Ammonia',
        'Application: CNG Station, Fertilizer Plant'
      ]
    },
    image: '/images/products/industrial_process_l.webp',
    specs: {
      zh: {
        '排气量': '500 - 5000 m³/h',
        '排气压力': '高达 20.0 MPa',
        '适用介质': '天然气、煤气、氨气',
        '结构形式': 'L型直角式'
      },
      en: {
        'Capacity': '500 - 5000 m³/h',
        'Pressure': 'Up to 20.0 MPa',
        'Media': 'NG, Coal Gas, Ammonia',
        'Structure': 'L-Type Right Angle'
      }
    },
    models: [
      {
        headers: {
          zh: ['型号', '排气量 (m³/min)', '进气压力 (MPa)', '排气压力 (MPa)', '电机功率 (kW)', '外型尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Displacement (m³/min)', 'Inlet Pres. (MPa)', 'Discharge Pres. (MPa)', 'Motor Power (kW)', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['LW-2.6/0.03-12', '2.6', '0.003', '-', '37', '2610×793×2076', '1800'],
          ['LW-4.2/0.5-8', '4.2', '0.05', '0.8', '37', '1882×1034×1950', '1800'],
          ['LW-3/0.13-8', '3', '0.013', '0.8', '37', '1970×887×1994', '1800'],
          ['LW-5/6', '5', '-', '0.6', '37', '2061×876×2060', '1800'],
          ['LW-3.2/2.8-9.5', '3.2', '0.28', '0.95', '37', '2170×1060×2190', '3200'],
          ['LW-6/0.5-2', '6', '0.05', '0.2', '37', '2042×885×2003', '2000'],
          ['LW-12N/2-5', '4.5', '0.2', '0.5', '37', '2100×880×2060', '1700'],
          ['LW-6/2.5-4.5', '6', '0.25', '0.45', '37', '2117×885×2078', '1800'],
          ['LW-2.5/0.2-16', '2.5', '0.02', '1.6', '37', '1991×955×2200', '2000'],
          ['LW-4.4/0.02-15', '4.4', '0.002', '1.5', '45', '2388×885×1995', '2000'],
          ['LW-5.7/0.03-7', '5.7', '0.003', '0.7', '45', '2093×876×2076', '1800'],
          ['LW-6/8', '6', '-', '0.8', '45', '1961×876×1950', '1800'],
          ['LW-4/7-10', '4', '0.7', '1', '45', '2100×880×2060', '1700'],
          ['LW-3/22', '3', '-', '2.2', '45', '1990×880×2002', '1700'],
          ['LW-4/20', '4', '-', '2', '45', '1990×880×2002', '1700'],
          ['LW-5/10', '5', '-', '1', '45', '1990×880×2002', '2000'],
          ['LW-3.5/8', '3.5', '-', '0.8', '45', '2041×885×2107', '2000'],
          ['LW-6/0.1-1.7', '6', '0.01', '0.17', '45', '2075×880×2073', '1800'],
          ['LW-5/0.02-20', '5', '0.002', '2', '55', '2388×885×1995', '2000'],
          ['LW-4.4/2-10', '4.4', '0.2', '10', '55', '1990×876×2007', '1700'],
          ['LW-6/18', '6', '-', '1.8', '55', '2150×915×2200', '2000'],
          ['LW-7.6/2-6', '7.6', '0.006', '0.6', '55', '2035×915×1952', '1900'],
          ['LW-8/0.06-8.5', '8', '-', '0.85', '55', '1940×876×2020', '1700'],
          ['LW-2/10-22', '2', '1', '2.2', '55', '1933×915×2038', '2000'],
          ['LW-5/20', '5', '-', '2', '55', '1990×880×2002', '1700'],
          ['LW-13/0.1-2.5', '13', '0.01', '0.25', '55', '2050×880×2010', '2000'],
          ['LW-6/15', '6', '-', '1.5', '55', '2228×885×2107', '2000'],
          ['LW-12/3', '12', '-', '0.3', '55', '2042×885×2003', '2000'],
          ['LW-5/22', '5', '-', '2.2', '55', '2050×915×2200', '2000'],
          ['LW-7.5/1.5-5.5', '7.5', '0.15', '0.55', '55', '2135×880×2133', '1800'],
          ['LW-9/3', '9', '-', '0.3', '55', '2250×880×2270', '1800'],
          ['LW-10/8', '10', '-', '0.8', '65', '1961×876×1950', '1800'],
          ['LW-20/1.5', '20', '-', '0.15', '65', '1990×876×2007', '2000'],
          ['LW-5.1/1.8-10', '5.1', '0.18', '1', '65', '2097×885×2107', '2000'],
          ['LW-20/0.03-2.5', '20', '0.003', '0.25', '75', '2750×880×2132', '-'],
          ['LW-26/0.5-1.5', '26', '0.05', '0.15', '75', '2025×876×2030', '2000'],
          ['LW-1.9/5-30', '1.9', '-', '3', '75', '2021×913×1922', '1800'],
          ['LW-10/11', '10', '0.005', '1.1', '75', '1910×878×2007', '2000'],
          ['LW-11/0.05-7', '11', '-', '0.7', '75', '1991×876×2007', '1700'],
          ['LW-15/3.5', '15', '0.4', '0.35', '75', '2107×915×2287', '2000'],
          ['LW-2.9/3-25', '2.9', '0.3', '2.5', '75', '2050×915×2200', '2000'],
          ['LW-6/25', '6', '-', '2.5', '75', '2259×885×2007', '2000'],
          ['LW-3.5/1.8-30', '3.5', '0.18', '3', '75', '2065×885×2050', '2000'],
          ['LW-7/0.05-15', '7', '0.005', '1.5', '75', '2268×1260×2397', '3000'],
          ['LW-8.5/0.15-7', '8.5', '0.015', '0.7', '75', '2061×876×2050', '1800'],
          ['LW-3.2/14.5-25', '3.2', '1.45', '2.5', '75', '1895×1960×876', '2000'],
          ['LW-4/2-18', '4', '0.2', '1.8', '75', '2020×915×1997', '2000'],
          ['LW-7/0.2-22', '7', '0.02', '2.2', '75', '2125×1170×2285', '3000'],
          ['LW-7/18-23', '7', '1.8', '2.3', '75', '1991×955×2200', '2000'],
          ['LW-17/1.5-3', '17', '0.15', '0.3', '75', '2250×880×2270', '1800'],
          ['LW-6.7/3-9', '6.7', '0.3', '0.9', '75', '2227×915×2007', '1700']
        ]
      }
    ]
  },

  // Parts & Vessels
  {
    id: 'parts-air-receivers',
    category: 'parts',
    title: {
      zh: '空气瓶',
      en: 'Air Receivers'
    },
    description: {
      zh: '船用高压储气罐，用于主机起动空气、控制空气储存。严格按照船级社压力容器规范设计制造，确保高压下的安全可靠性。',
      en: 'Marine high-pressure air receiver for main engine starting air and control air storage. Designed and manufactured strictly in accordance with classification society pressure vessel codes to ensure safety and reliability under high pressure.'
    },
    features: {
      zh: [
        '船级社认证: 符合CCS, DNV, LR等规范',
        '高压安全: 经过严格的压力测试与探伤',
        '防腐耐用: 内部特殊防腐处理，延长使用寿命'
      ],
      en: [
        'Certified: Compliant with CCS, DNV, LR codes',
        'High pressure safety: Rigorous pressure testing and NDT',
        'Durable: Special internal anti-corrosion treatment'
      ]
    },
    detailedFeatures: {
      zh: [
        '设计压力：高达 3.5 MPa',
        '容积范围：0.08 - 10.0 m³',
        '材质：优质碳钢或不锈钢',
        '安装方式：立式或卧式',
        '附件：配备安全阀、压力表、排污阀',
        '表面处理：喷砂除锈，环氧富锌底漆',
        '适用介质：压缩空气、氮气',
        '设计寿命：20年'
      ],
      en: [
        'Design Pressure: Up to 3.5 MPa',
        'Volume Range: 0.08 - 10.0 m³',
        'Material: High Quality Carbon Steel or SS',
        'Mounting: Vertical or Horizontal',
        'Accessories: Safety Valve, Gauge, Drain Valve',
        'Surface: Sandblasting, Epoxy Zinc-rich Primer',
        'Media: Compressed Air, Nitrogen',
        'Design Life: 20 Years'
      ]
    },
    image: '/images/products/parts_air_receivers.webp',
    specs: {
      zh: {
        '容积': '0.08 - 10.0 m³',
        '设计压力': '3.0 / 3.5 MPa',
        '材质': '碳钢 / 不锈钢',
        '认证': 'CCS / DNV / LR'
      },
      en: {
        'Volume': '0.08 - 10.0 m³',
        'Pressure': '3.0 / 3.5 MPa',
        'Material': 'Carbon Steel / SS',
        'Certification': 'CCS / DNV / LR'
      }
    },
    models: [
      {
        headers: {
          zh: ['型号', '容积 (m³)', '设计压力 (MPa)', '直径 (mm)', '高度 (mm)', '重量 (kg)'],
          en: ['Model', 'Volume (m³)', 'Design Pres. (MPa)', 'Diameter (mm)', 'Height (mm)', 'Weight (kg)']
        },
        rows: [
          ['A0.08-3.0', '0.08', '3.0', '400', '950', '120'],
          ['A0.16-3.0', '0.16', '3.0', '500', '1100', '180'],
          ['A0.25-3.0', '0.25', '3.0', '600', '1300', '250'],
          ['A0.5-3.0', '0.5', '3.0', '800', '1600', '450'],
          ['A1.0-3.0', '1.0', '3.0', '1000', '1900', '800'],
          ['A2.0-3.0', '2.0', '3.0', '1200', '2400', '1500'],
          ['A3.0-3.0', '3.0', '3.0', '1400', '2800', '2200']
        ]
      }
    ]
  },
  {
    id: 'parts-accumulators',
    category: 'parts',
    title: {
      zh: '蓄能器',
      en: 'Accumulators'
    },
    description: {
      zh: '液压蓄能器，用于液压系统能量储存与压力稳定，广泛应用于船舶液压设备、舵机系统及甲板机械。',
      en: 'Hydraulic accumulators for energy storage and pressure stabilization in hydraulic systems. Widely used in marine hydraulic equipment, steering gear systems and deck machinery.'
    },
    features: {
      zh: [
        '能量储存: 辅助液压泵源，提供瞬时大流量',
        '吸收脉动: 减少系统压力波动与冲击',
        '多种类型: 囊式、活塞式、隔膜式可选'
      ],
      en: [
        'Energy storage: Assist pump source, provide instant high flow',
        'Absorb pulsation: Reduce system pressure fluctuation and shock',
        'Types: Bladder, Piston, Diaphragm available'
      ]
    },
    detailedFeatures: {
      zh: [
        '公称压力：10 - 31.5 MPa',
        '公称容积：0.4 - 100 L',
        '结构形式：囊式 (L型)',
        '连接方式：螺纹或法兰',
        '适用介质：液压油、水-乙二醇',
        '工作温度：-10℃ ~ +70℃',
        '壳体材质：高强度合金钢',
        '胶囊材质：NBR / FKM'
      ],
      en: [
        'Nominal Pressure: 10 - 31.5 MPa',
        'Nominal Volume: 0.4 - 100 L',
        'Structure: Bladder Type (L)',
        'Connection: Thread or Flange',
        'Media: Hydraulic Oil, Water-Glycol',
        'Working Temp: -10℃ ~ +70℃',
        'Shell Material: High Strength Alloy Steel',
        'Bladder Material: NBR / FKM'
      ]
    },
    image: '/images/products/parts_accumulators.webp',
    specs: {
      zh: {
        '容积': '0.4 - 100 L',
        '压力等级': '10 / 20 / 31.5 MPa',
        '类型': '囊式 / 活塞式',
        '适用介质': '液压油'
      },
      en: {
        'Volume': '0.4 - 100 L',
        'Pressure': '10 / 20 / 31.5 MPa',
        'Type': 'Bladder / Piston',
        'Media': 'Hydraulic Oil'
      }
    },
    models: [
      {
        headers: {
          zh: ['型号', '公称容积 (L)', '公称压力 (MPa)', '直径 (mm)', '总高 (mm)', '重量 (kg)'],
          en: ['Model', 'Volume (L)', 'Pressure (MPa)', 'Diameter (mm)', 'Height (mm)', 'Weight (kg)']
        },
        rows: [
          ['NXQ-A-0.4/31.5', '0.4', '31.5', '89', '280', '4'],
          ['NXQ-A-1.0/31.5', '1.0', '31.5', '114', '340', '8'],
          ['NXQ-A-2.5/31.5', '2.5', '31.5', '114', '520', '12'],
          ['NXQ-A-4.0/31.5', '4.0', '31.5', '168', '430', '18'],
          ['NXQ-A-6.3/31.5', '6.3', '31.5', '168', '560', '24'],
          ['NXQ-A-10/31.5', '10', '31.5', '219', '550', '35'],
          ['NXQ-A-25/31.5', '25', '31.5', '219', '1050', '65'],
          ['NXQ-A-40/31.5', '40', '31.5', '273', '1100', '110'],
          ['NXQ-A-63/31.5', '63', '31.5', '273', '1600', '160']
        ]
      }
    ]
  },
  {
    id: 'parts-air-dryers',
    category: 'parts',
    title: {
      zh: '干燥器',
      en: 'Air Dryers'
    },
    description: {
      zh: '冷冻式与吸附式干燥器，用于压缩空气除湿净化，确保气源质量符合船舶仪表控制及工艺用气要求。',
      en: 'Refrigerated and adsorption dryers for compressed air dehumidification and purification, ensuring air quality meets marine instrument control and process air requirements.'
    },
    features: {
      zh: [
        '高效除水: 露点温度低，除水效果好',
        '多种类型: 冷冻式、无热再生、微热再生可选',
        '节能环保: 优化的气流设计，压损小'
      ],
      en: [
        'High efficiency: Low dew point, effective water removal',
        'Types: Refrigerated, Heatless, Heated regeneration',
        'Eco-friendly: Optimized airflow, low pressure drop'
      ]
    },
    detailedFeatures: {
      zh: [
        '处理气量：0.5 - 100 m³/min',
        '压力露点：2~10℃ (冷冻式) / -40~-70℃ (吸附式)',
        '工作压力：0.6 - 1.0 MPa (可定制高压)',
        '进气温度：≤ 80℃',
        '冷却方式：风冷或水冷',
        '再生耗气量：≤ 14% (无热) / ≤ 6% (微热)',
        '控制方式：全自动程序控制',
        '适用介质：压缩空气'
      ],
      en: [
        'Capacity: 0.5 - 100 m³/min',
        'Dew Point: 2~10℃ (Refrig) / -40~-70℃ (Adsorp)',
        'Working Pressure: 0.6 - 1.0 MPa (Customizable)',
        'Inlet Temp: ≤ 80℃',
        'Cooling: Air or Water Cooled',
        'Regen Air Loss: ≤ 14% (Heatless) / ≤ 6% (Heated)',
        'Control: Fully Automatic',
        'Media: Compressed Air'
      ]
    },
    image: '/images/products/parts_air_dryers.webp',
    specs: {
      zh: {
        '处理量': '0.5 - 100 m³/min',
        '露点温度': '2~10℃ / -40℃ / -70℃',
        '类型': '冷冻式 / 吸附式',
        '冷却方式': '风冷 / 水冷'
      },
      en: {
        'Capacity': '0.5 - 100 m³/min',
        'Dew Point': '2~10℃ / -40℃ / -70℃',
        'Type': 'Refrigerated / Adsorption',
        'Cooling': 'Air / Water Cooled'
      }
    },
    models: [
      {
        title: {
          zh: 'RD型冷冻式干燥器',
          en: 'RD Series Refrigerated Dryer'
        },
        headers: {
          zh: ['型号', '处理气量 (m³/min)', '接口尺寸', '电压/频率 (V/Hz)', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Air Volume (m³/min)', 'Port Dimensions', 'Voltage/Freq (V/Hz)', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['RD-5A', '0.7', 'G1/2', '220/50', '650×390×630', '30'],
          ['RD-10A', '1.5', 'G1', '220/50', '650×390×630', '35'],
          ['RD-20A', '2.6', 'G1', '220/50', '700×420×770', '50'],
          ['RD-30A', '3.8', 'G1.5', '220/50', '750×440×850', '70'],
          ['RD-50A', '5.5', 'G1.5', '220/50', '880×480×870', '90'],
          ['RD-60A', '6.8', 'G1.5', '220/50', '1000×480×1000', '120'],
          ['RD-80A', '8.5', 'G1.5', '220/50', '1100×480×1050', '160'],
          ['RD-110A', '11', 'G2', '220/50', '1250×650×1050', '220'],
          ['RD-130A', '13.5', 'G2', '220/50', '1250×650×1050', '260'],
          ['RD-180A', '18', 'DN65', '380/50', '1350×750×1200', '340'],
          ['RD-230A', '23', 'DN80', '380/50', '1530×750×1200', '420'],
          ['RD-280A', '28', 'DN80', '380/50', '1550×750×1350', '500'],
          ['RD-350A', '35', 'DN80', '380/50', '1750×900×1550', '780'],
          ['RD-450A', '45', 'DN100', '380/50', '1950×1050×1650', '850'],
          ['RD-550A', '55', 'DN100', '380/50', '2250×1200×1650', '850']
        ]
      },
      {
        title: {
          zh: 'YDH型无热再生吸附式干燥器',
          en: 'YDH Series Heatless Adsorption Dryer'
        },
        headers: {
          zh: ['型号', '处理气量 (m³/min)', '接口尺寸', '进气含油量 (ppm)', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Air Volume (m³/min)', 'Port Dimensions', 'Oil Content (ppm)', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['YDH-10', '1.5', 'G1', '≤0.01', '800×350×1550', '110'],
          ['YDH-20', '2.5', 'G1', '≤0.01', '800×350×1650', '140'],
          ['YDH-40', '4', 'G1', '≤0.01', '1000×450×1700', '180'],
          ['YDH-70', '7', 'G1.5', '≤0.01', '1350×550×1900', '320'],
          ['YDH-110', '11', 'G2', '≤0.01', '1400×600×2000', '420'],
          ['YDH-140', '14', 'G2', '≤0.01', '1400×600×2150', '480'],
          ['YDH-180', '18', 'DN65', '≤0.01', '1400×600×2350', '700'],
          ['YDH-230', '23', 'DN80', '≤0.01', '1650×650×2400', '900'],
          ['YDH-350', '35', 'DN80', '≤0.01', '1700×750×2650', '1300'],
          ['YDH-450', '45', 'DN100', '≤0.01', '1800×750×2850', '1600'],
          ['YDH-550', '55', 'DN100', '≤0.01', '1900×750×2850', '1850'],
          ['YDH-650', '65', 'DN125', '≤0.01', '2300×850×3050', '2300'],
          ['YDH-850', '85', 'DN125', '≤0.01', '2800×1000×3050', '2800']
        ]
      },
      {
        title: {
          zh: 'YBH型微热再生吸附式干燥器',
          en: 'YBH Series External Heater Regenerative Dryer'
        },
        headers: {
          zh: ['型号', '处理气量 (m³/min)', '接口尺寸', '加热器功率 (kW)', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Air Volume (m³/min)', 'Port Dimensions', 'Heater Power (kW)', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['YBH-10', '1.5', 'G1', '1', '800×350×1550', '120'],
          ['YBH-20', '2.5', 'G1', '2', '800×350×1650', '150'],
          ['YBH-40', '4', 'G1', '2', '1000×450×1700', '200'],
          ['YBH-70', '7', 'G1.5', '3', '1350×550×1900', '350'],
          ['YBH-110', '11', 'G2', '3', '1400×600×2000', '450'],
          ['YBH-140', '14', 'G2', '3', '1400×600×2150', '510'],
          ['YBH-180', '18', 'DN65', '6', '1400×600×2350', '750'],
          ['YBH-230', '23', 'DN80', '6', '1650×650×2400', '950'],
          ['YBH-350', '35', 'DN80', '9', '1700×750×2650', '1400'],
          ['YBH-450', '45', 'DN100', '12', '1800×750×2850', '1700'],
          ['YBH-550', '55', 'DN100', '15', '1900×750×2850', '1950'],
          ['YBH-650', '65', 'DN125', '21', '2300×850×3050', '2400'],
          ['YBH-850', '85', 'DN125', '27', '2800×1000×3050', '2900']
        ]
      }
    ]
  },
  {
    id: 'parts-filters',
    category: 'parts',
    title: {
      zh: '过滤器',
      en: 'Filters'
    },
    description: {
      zh: '压缩空气精密过滤器，有效去除压缩空气中的油雾、颗粒杂质和液态水，保护下游气动设备与精密仪表。',
      en: 'Compressed air precision filters effectively remove oil mist, particulate impurities and liquid water from compressed air, protecting downstream pneumatic equipment and precision instruments.'
    },
    features: {
      zh: [
        '多级过滤: C/T/A/F/H多级精度可选',
        '高效滤芯: 采用进口滤材，过滤效率高',
        '压损低: 优化的流道设计，节能降耗'
      ],
      en: [
        'Multi-stage: C/T/A/F/H grades available',
        'High efficiency: Imported filter material',
        'Low pressure drop: Optimized flow path'
      ]
    },
    detailedFeatures: {
      zh: [
        '过滤精度：3μm ~ 0.01μm',
        '除油含量：≤ 5ppm ~ ≤ 0.001ppm',
        '工作压力：1.0 MPa (标准) / 4.0 MPa (高压)',
        '最大流量：1.0 - 100 m³/min',
        '壳体材质：铝合金或碳钢',
        '滤芯寿命：4000 - 6000 小时',
        '配备：自动排水器、压差表',
        '适用介质：压缩空气、氮气'
      ],
      en: [
        'Filtration: 3μm ~ 0.01μm',
        'Oil Removal: ≤ 5ppm ~ ≤ 0.001ppm',
        'Working Pressure: 1.0 MPa (Std) / 4.0 MPa (HP)',
        'Max Flow: 1.0 - 100 m³/min',
        'Housing: Aluminum Alloy or Carbon Steel',
        'Element Life: 4000 - 6000 hours',
        'Equipped: Auto drain, Diff. pressure gauge',
        'Media: Compressed Air, Nitrogen'
      ]
    },
    image: '/images/products/parts_filters.webp',
    specs: {
      zh: {
        '过滤精度': '3μm / 1μm / 0.01μm',
        '残油量': '5ppm / 0.5ppm / 0.01ppm',
        '最大流量': '1.0 - 100 m³/min',
        '材质': '铝合金 / 碳钢'
      },
      en: {
        'Filtration': '3μm / 1μm / 0.01μm',
        'Oil Content': '5ppm / 0.5ppm / 0.01ppm',
        'Max Flow': '1.0 - 100 m³/min',
        'Material': 'Alu Alloy / Carbon Steel'
      }
    },
    models: [
      {
        title: {
          zh: '精密过滤器参数',
          en: 'Precision Filters Parameters'
        },
        headers: {
          zh: ['型号', '处理气量 (m³/min)', '接口尺寸', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Air Treated Volume (m³/min)', 'Ports Dimensions', 'Dimension (mm)', 'Weight (kg)']
        },
        rows: [
          ['(Level)-001G', '≤66', 'G1', '105×285', '1.5'],
          ['(Level)-002G', '≤66', 'G1', '105×285', '1.6'],
          ['(Level)-003G', '≤66', 'G1.5', '125×345', '2.5'],
          ['(Level)-005G', '≤66', 'G1.5', '125×345', '2.9'],
          ['(Level)-007G', '≤66', 'G1.5', '125×480', '3.5'],
          ['(Level)-011G', '≤66', 'G2', '140×690', '4.5'],
          ['(Level)-013G', '≤66', 'G2', '140×690', '5'],
          ['(Level)-018G', '≤66', 'G2.5', '160×930', '10'],
          ['(Level)-022G', '≤66', 'G2.5', '160×930', '16'],
          ['(Level)-022F', '≤66', 'DN80', '340×1200', '45'],
          ['(Level)-036F', '≤66', 'DN80', '420×1200', '75'],
          ['(Level)-044F', '≤66', 'DN100', '420×1200', '85'],
          ['(Level)-054F', '≤66', 'DN100', '500×1250', '110']
        ]
      },
      {
        title: {
          zh: '滤芯等级参数',
          en: 'Filter Element Grades'
        },
        headers: {
          zh: ['等级', '过滤精度 (μm)', '残油量 (ppm)', '适用场景'],
          en: ['Grade', 'Filtration (μm)', 'Oil Content (ppm)', 'Application']
        },
        rows: [
          ['C', '3', '5', '初级过滤，去除大量液态水和颗粒'],
          ['T', '1', '1', '标准过滤，适用于一般工业应用'],
          ['A', '0.01', '0.01', '高效除油，用于喷漆、仪表'],
          ['F', '0.01', '0.001', '超高效除油，用于洁净环境'],
          ['H', '0.01', '0.003', '活性炭除臭，去除异味和油蒸气'],
          ['FT', '1', '1', '复合过滤，兼顾效率与成本'],
          ['FA', '0.01', '0.01', '复合高精度过滤']
        ]
      }
    ]
  },
  {
    id: 'parts-control-panels',
    category: 'parts',
    title: {
      zh: '电控箱',
      en: 'Control Panels'
    },
    description: {
      zh: '压缩机专用电气控制系统，集成了启停控制、安全保护、参数监测及远程通讯功能，确保压缩机组安全高效运行。',
      en: 'Dedicated electrical control system for compressors, integrating start/stop control, safety protection, parameter monitoring and remote communication functions to ensure safe and efficient operation of compressor units.'
    },
    features: {
      zh: [
        '智能控制: PLC/单片机控制，自动化程度高',
        '全面保护: 过载、短路、缺相、高温高压保护',
        '人机交互: 触摸屏显示，操作直观便捷'
      ],
      en: [
        'Smart control: PLC/MCU control, high automation',
        'Full protection: Overload, short circuit, phase loss, temp/pressure protection',
        'HMI: Touch screen display, intuitive operation'
      ]
    },
    detailedFeatures: {
      zh: [
        '控制核心：西门子/施耐德 PLC',
        '启动方式：直接启动、星三角、软启动、变频',
        '防护等级：IP44 / IP54 / IP55',
        '显示功能：运行状态、故障报警、维护提示',
        '通讯接口：RS485 (Modbus RTU)',
        '电源电压：AC 380V / 440V / 690V',
        '柜体材质：冷轧钢板喷塑或不锈钢',
        '认证：CCS船级社认证'
      ],
      en: [
        'Core: Siemens/Schneider PLC',
        'Start Method: DOL, Star-Delta, Soft Start, VSD',
        'Protection: IP44 / IP54 / IP55',
        'Display: Status, Alarm, Maintenance',
        'Comm: RS485 (Modbus RTU)',
        'Voltage: AC 380V / 440V / 690V',
        'Cabinet: Powder Coated Steel or SS',
        'Certification: CCS Classification'
      ]
    },
    image: '/images/products/parts_control_panels.webp',
    specs: {
      zh: {
        '控制方式': 'PLC / 继电器',
        '启动方式': '直接 / 星三角 / 软启 / 变频',
        '防护等级': 'IP44 / IP54 / IP55',
        '认证': 'CCS'
      },
      en: {
        'Control': 'PLC / Relay',
        'Start': 'DOL / Y-Δ / Soft / VSD',
        'Protection': 'IP44 / IP54 / IP55',
        'Certification': 'CCS'
      }
    },
    models: [
      {
        headers: {
          zh: ['型号', '电机功率 (kW)', '接口尺寸', '外形尺寸 (mm)', '重量 (kg)'],
          en: ['Model', 'Motor Power (kW)', 'Port Dimensions', 'Dimensions (mm)', 'Weight (kg)']
        },
        rows: [
          ['XCD-01L', '5.5', 'TJ28', '500×350×250', '21'],
          ['XCD-01L', '7.5', 'TJ28', '500×350×250', '21'],
          ['XCD-02L', '10 - 20', 'TJ28', '600×440×250', '35'],
          ['XCD-2L', '20 - 30', 'TJ28', '600×440×250', '35'],
          ['XCD-3L', '30 - 40', 'TJ28', '400×600×250', '36'],
          ['XCD-1', '10 - 20', 'TJ28', '600×440×250', '35'],
          ['XCD-2', '20 - 30', 'TJ28', '600×440×250', '35'],
          ['XCD-3', '30 - 40', 'TJ28', '700×550×250', '36'],
          ['XCD-4', '40 - 50', 'TJ42', '700×550×250', '51'],
          ['XCD-5', '50 - 60', 'TJ42', '800×550×250', '51'],
          ['XCD-7', '70 - 90', 'TJ42', '800×550×250', '-']
        ]
      }
    ]
  }
];
