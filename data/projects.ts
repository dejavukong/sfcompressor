export interface ProjectCase {
  id: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  image: string;
  sortOrder: number;
}

export const projects: ProjectCase[] = [
  {
    id: '1',
    title: {
      zh: 'M型新型制冷剂压缩机',
      en: 'M-Type New Refrigerant Compressor',
    },
    description: {
      zh: '采用M型对称平衡型往复式，四列四缸三级压缩，压缩机流量采用变频调节，对冷却、密封、润滑系统进行优化设计，用户现场运行稳定。',
      en: 'Adopts M-type symmetrically balanced reciprocating design with four-column, four-cylinder, three-stage compression. Flow rate is regulated by variable frequency drive. Cooling, sealing, and lubrication systems are optimally designed for stable on-site operation.',
    },
    image: '/images/products/industrial_process_m.webp',
    sortOrder: 4,
  },
  {
    id: '2',
    title: {
      zh: 'D型燃气轮机发电增压压缩机机组',
      en: 'D-Type Gas Turbine Power Generation Booster Compressor Unit',
    },
    description: {
      zh: '替代用户进口设备，运行平稳，达到进口设备技术水平。',
      en: 'Replaces imported equipment with smooth operation, achieving the same technical performance level as imported units.',
    },
    image: '/images/products/industrial_process_d.webp',
    sortOrder: 5,
  },
  {
    id: '3',
    title: {
      zh: '油田火炬气压缩机',
      en: 'Oilfield Flare Gas Compressor',
    },
    description: {
      zh: 'M型对称平衡活塞式撬装结构，节能降耗便于维护易于操作，可连续无故障运行12000-15000小时，控制系统采用单机PLC控制，液晶触摸屏，智能化控制。',
      en: 'M-type symmetrically balanced piston skid-mounted design. Energy-efficient, easy to maintain and operate with 12,000–15,000 hours of continuous fault-free operation. Features standalone PLC control with LCD touchscreen for intelligent operation.',
    },
    image: '/images/products/industrial_process_m.png',
    sortOrder: 6,
  },
  {
    id: '4',
    title: {
      zh: 'M型新型集成式氯甲烷压缩机',
      en: 'M-Type Integrated Methyl Chloride Compressor',
    },
    description: {
      zh: '基于多年氯甲烷压缩机设计制造的理论与实践经验，不断优化系统各部件，具有压缩比高、运行平稳，环保实用的特点。',
      en: 'Built on years of theoretical and practical experience in methyl chloride compressor design and manufacturing. Continuously optimized components deliver high compression ratio, smooth operation, and environmentally friendly performance.',
    },
    image: '/images/products/industrial_process_l.webp',
    sortOrder: 7,
  },
  {
    id: '6',
    title: {
      zh: '海洋钻井平台清吹系统',
      en: 'Offshore Drilling Platform Purge System',
    },
    description: {
      zh: '中英文智能液晶触摸屏PLC控制系统无人值守操作，连续工作。模块撬装结构，安装方便，操作简单，运行平稳。由于远离陆地、空间小，海上钻井平台需要强悍的、质量可靠的压缩机。海上特殊的工作环境，压缩机长期处于高盐、高湿、高温、暴晒等恶劣条件，极易发生腐蚀。公司技术人员与项目方积极沟通，成功克服困难拿出了清吹系统模块解决方案，按时交货并顺利通过了验收。',
      en: 'Bilingual intelligent LCD touchscreen PLC control system for unattended, continuous operation. Modular skid-mounted design for easy installation, simple operation, and stable performance. Offshore drilling platforms require robust, reliable compressors due to limited space and remote locations. The harsh marine environment—high salinity, humidity, temperature, and UV exposure—accelerates corrosion. Our engineering team worked closely with the project owner to develop a modular purge system solution, delivering on time and passing acceptance testing.',
    },
    image: '/images/project_offshore.jpg',
    sortOrder: 1,
  },
  {
    id: '7',
    title: {
      zh: '24800DWT 油化船及4350箱集装箱船启动空压机',
      en: '24,800 DWT Oil/Chemical Tanker & 4,350 TEU Container Ship Starting Air Compressor',
    },
    description: {
      zh: '为主机或发电机组提供中高压启动空气：海洋环境适应性——采用重载型设计，部件具备防盐雾、防霉菌、防湿热能力；高强度持续运行——能在高负荷下连续工作，冷却系统高效可靠；智能自动控制——实现自动启停、压力自动维持、故障自动报警与切换；低维护需求——设计上便于日常检修和维护，保障船舶长期自持力。',
      en: 'Provides medium-to-high pressure starting air for main engines and generator sets. Marine-adapted heavy-duty design with anti-salt spray, anti-mold, and moisture-resistant components. Capable of continuous high-load operation with efficient and reliable cooling. Intelligent automatic control for auto start/stop, pressure maintenance, fault alarm, and switchover. Low-maintenance design ensures easy routine inspection and long-term vessel self-sufficiency.',
    },
    image: '/images/project_cargo_ship.jpg',
    sortOrder: 2,
  },
  {
    id: '8',
    title: {
      zh: '空气系统储气罐',
      en: 'Air System Air Receivers',
    },
    description: {
      zh: '主空气瓶用于主机、辅机启动；辅空气瓶用于控制快关阀、汽笛、海底阀箱的空气吹洗等；结构分A型立式或倾斜式和B型卧式；可适应不同工作压力和应用需求，用途广泛。',
      en: 'Main air receivers for main engine and auxiliary engine starting. Secondary air receivers for quick-closing valve control, whistle operation, and sea chest air purging. Available in Type A (vertical or inclined) and Type B (horizontal) configurations. Adaptable to various working pressures and application requirements.',
    },
    image: '/images/products/parts_air_receivers.webp',
    sortOrder: 3,
  },
];
