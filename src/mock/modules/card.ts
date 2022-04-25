const List = [
  {
    id: 1,
    name: '技术债务率',
    desc:
      '<b style="color:#15aeff;font-size:14px;">需求统计</b><br><br>主办专题数：统计团队主办专题的数量。<br><br>参与特性数：统计团队参与特性的数量。<br><br>详细说明：<br>1）在需求空间的特性上添加实施组，且特性审批通过，则该组/室/团队/中心算作参与该特性；<br>2）一个特性在一个中心/团队/室下多个组同时实施，该中心/团队/室参与的特性数只算1个；<br>3）立项状态分为3种：待立项（实施组均未立项）、部分立项（部分实施组立项）、已立项（全部实施组立项）',
    type: '交付质量',
    color: '#7030a0',
    data: [{ name: '技术债务率', value: '1.70', suffix: '%', aggre: null }],
    visualizationMode: 'board1',
    url: 'https://www.baidu.com/'
  },
  {
    id: 2,
    name: '需求统计（组）',
    desc:
      '<b style="color:#15aeff;font-size:14px;">上线投产次数</b><br><br>指标业务价值：上线投产次数是业务可感知的、衡量组织的交付能力的重要指标。通过指标了解中心/团队/室/组上线投产情况。<br><br>项目上线次数：统计周期内上线发布的项目次数。<br>上线Label次数：统计周期内上线发布的项目中的Label发布次数。<br><br >注：上线数据包含通过VP向数据中心提交上线申请的项目、信用卡团队的上线项目、以及上线申请_数据类（PMS/DEVOPS）流程等。非数据中心投产项目（如数仓机房或电话银行等)不包含在内，同时不包含分行立项或者非总行部署的项目。',
    type: '交付质量',
    color: '#e26b0a',
    data: [{ name: '主办专题数', value: '1', suffix: '个', aggre: null }],
    visualizationMode: 'board2',
    url: 'https://www.baidu.com/'
  },
  {
    id: 3,
    name: '待关注卡片信息',
    desc:
      '<b style="color:#15aeff;font-size:14px;">需求统计</b><br><br>主办专题数：统计团队主办专题的数量。<br><br>参与特性数：统计团队参与特性的数量。<br><br>详细说明：<br>1）在需求空间的特性上添加实施组，且特性审批通过，则该组/室/团队/中心算作参与该特性；<br>2）一个特性在一个中心/团队/室下多个组同时实施，该中心/团队/室参与的特性数只算1个；<br>3）立项状态分为3种：待立项（实施组均未立项）、部分立项（部分实施组立项）、已立项（全部实施组立项）',
    type: '需求管理',
    color: '#663300',
    data: [],
    visualizationMode: 'board',
    url: 'https://www.baidu.com/'
  },
  {
    id: 4,
    name: '报工投入情况',
    desc:
      '<b style="color:#15aeff;font-size:14px;">上线投产次数</b><br><br>指标业务价值：上线投产次数是业务可感知的、衡量组织的交付能力的重要指标。通过指标了解中心/团队/室/组上线投产情况。<br><br>项目上线次数：统计周期内上线发布的项目次数。<br>上线Label次数：统计周期内上线发布的项目中的Label发布次数。<br><br >注：上线数据包含通过VP向数据中心提交上线申请的项目、信用卡团队的上线项目、以及上线申请_数据类（PMS/DEVOPS）流程等。非数据中心投产项目（如数仓机房或电话银行等)不包含在内，同时不包含分行立项或者非总行部署的项目。',
    type: '交付能力',
    color: '#e26b0a',
    data: [{ name: '技术债务率', value: 1.7, suffix: '个', aggre: null }],
    visualizationMode: 'board',
    url: 'https://www.baidu.com/'
  },
  {
    id: 5,
    name: '人员能力认证',
    desc:
      '<b style="color:#15aeff;font-size:14px;">上线投产次数</b><br><br>指标业务价值：上线投产次数是业务可感知的、衡量组织的交付能力的重要指标。通过指标了解中心/团队/室/组上线投产情况。<br><br>项目上线次数：统计周期内上线发布的项目次数。<br>上线Label次数：统计周期内上线发布的项目中的Label发布次数。<br><br >注：上线数据包含通过VP向数据中心提交上线申请的项目、信用卡团队的上线项目、以及上线申请_数据类（PMS/DEVOPS）流程等。非数据中心投产项目（如数仓机房或电话银行等)不包含在内，同时不包含分行立项或者非总行部署的项目。',
    type: '交付质量',
    color: '#e26b0a',
    data: [{ name: '技术债务率', value: 1.7, suffix: '个', aggre: null }],
    visualizationMode: 'board',
    url: 'https://www.baidu.com/'
  },
  {
    id: 6,
    name: '需求统计',
    desc:
      '<b style="color:#15aeff;font-size:14px;">上线投产次数</b><br><br>指标业务价值：上线投产次数是业务可感知的、衡量组织的交付能力的重要指标。通过指标了解中心/团队/室/组上线投产情况。<br><br>项目上线次数：统计周期内上线发布的项目次数。<br>上线Label次数：统计周期内上线发布的项目中的Label发布次数。<br><br >注：上线数据包含通过VP向数据中心提交上线申请的项目、信用卡团队的上线项目、以及上线申请_数据类（PMS/DEVOPS）流程等。非数据中心投产项目（如数仓机房或电话银行等)不包含在内，同时不包含分行立项或者非总行部署的项目。',
    type: '交付速度',
    color: '#e26b0a',
    data: [{ name: '技术债务率', value: 1.7, suffix: '个', aggre: null }],
    visualizationMode: 'board',
    url: 'https://www.baidu.com/'
  },
  {
    id: 7,
    name: '项目整体情况',
    desc:
      '<b style="color:#15aeff;font-size:14px;">需求统计</b><br><br>主办专题数：统计团队主办专题的数量。<br><br>参与特性数：统计团队参与特性的数量。<br><br>详细说明：<br>1）在需求空间的特性上添加实施组，且特性审批通过，则该组/室/团队/中心算作参与该特性；<br>2）一个特性在一个中心/团队/室下多个组同时实施，该中心/团队/室参与的特性数只算1个；<br>3）立项状态分为3种：待立项（实施组均未立项）、部分立项（部分实施组立项）、已立项（全部实施组立项）',
    type: '交付质量',
    color: '#7030a0',
    data: [
      {
        name: '结项',
        value: 12,
        suffix: '个'
      },
      {
        name: '实施中',
        value: 7,
        suffix: '个'
      },
      {
        name: '立项',
        value: 6,
        suffix: '个'
      }
    ],
    visualizationMode: 'bar1',
    url: 'https://www.baidu.com/'
  },
  {
    id: 8,
    name: '上线投产次数',
    desc:
      '<b style="color:#15aeff;font-size:14px;">需求统计</b><br><br>主办专题数：统计团队主办专题的数量。<br><br>参与特性数：统计团队参与特性的数量。<br><br>详细说明：<br>1）在需求空间的特性上添加实施组，且特性审批通过，则该组/室/团队/中心算作参与该特性；<br>2）一个特性在一个中心/团队/室下多个组同时实施，该中心/团队/室参与的特性数只算1个；<br>3）立项状态分为3种：待立项（实施组均未立项）、部分立项（部分实施组立项）、已立项（全部实施组立项）',
    type: '需求管理',
    color: '#663300',
    data: [{ name: '技术债务率', value: 1.7, suffix: '个', aggre: null }],
    visualizationMode: 'board',
    url: 'https://www.baidu.com/'
  },
  {
    id: 9,
    name: '代码检视',
    desc:
      '<b style="color:#15aeff;font-size:14px;">上线投产次数</b><br><br>指标业务价值：上线投产次数是业务可感知的、衡量组织的交付能力的重要指标。通过指标了解中心/团队/室/组上线投产情况。<br><br>项目上线次数：统计周期内上线发布的项目次数。<br>上线Label次数：统计周期内上线发布的项目中的Label发布次数。<br><br >注：上线数据包含通过VP向数据中心提交上线申请的项目、信用卡团队的上线项目、以及上线申请_数据类（PMS/DEVOPS）流程等。非数据中心投产项目（如数仓机房或电话银行等)不包含在内，同时不包含分行立项或者非总行部署的项目。',
    type: '交付能力',
    color: '#e26b0a',
    data: [{ name: '技术债务率', value: 1.7, suffix: '个', aggre: null }],
    visualizationMode: 'board',
    url: 'https://www.baidu.com/'
  },
  {
    id: 10,
    name: '需求完成度',
    desc:
      '<b style="color:#15aeff;font-size:14px;">上线投产次数</b><br><br>指标业务价值：上线投产次数是业务可感知的、衡量组织的交付能力的重要指标。通过指标了解中心/团队/室/组上线投产情况。<br><br>项目上线次数：统计周期内上线发布的项目次数。<br>上线Label次数：统计周期内上线发布的项目中的Label发布次数。<br><br >注：上线数据包含通过VP向数据中心提交上线申请的项目、信用卡团队的上线项目、以及上线申请_数据类（PMS/DEVOPS）流程等。非数据中心投产项目（如数仓机房或电话银行等)不包含在内，同时不包含分行立项或者非总行部署的项目。',
    type: '交付速度',
    color: '#e26b0a',
    data: [{ name: '技术债务率', value: 1.7, suffix: '个', aggre: null }],
    visualizationMode: 'board',
    url: 'https://www.baidu.com/'
  }
]

const getIconList = {
  url: '/card/getIconList',
  method: 'get',
  template: {
    code: 200,
    msg: 'success',
    data: { list: List, total: List.length }
  }
}

export default [getIconList]
