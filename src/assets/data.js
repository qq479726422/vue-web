const listState  = [
 { 
  vendorId: 1, 
  vendorName: "法国 banrock 红酒庄", 
  goods: [
    {
      goodsId: 1,
      thumb:"https://tva1.sinaimg.cn/large/00831rSTgy1gczok56tkzj30m80m8qe4.jpg", 
      name: "好喝高颜值 MEOW 莫斯卡托气泡葡萄酒甜型香槟少女粉猫起泡酒", 
      details: "芭诺斯时光之约气泡酒 试饮装 50ml",
      price: 25, 
      num: 1,
      spec: {},
      existing:[]
    },{
      goodsId: 2,
      thumb: "https://tva1.sinaimg.cn/large/00831rSTgy1gczok56tkzj30m80m8qe4.jpg", 
      name: "好喝高颜值 MEOW 莫斯卡托气泡葡萄酒甜型香槟少女粉猫起泡酒", 
      details: "芭诺斯晚霞气泡酒 250ml", 
      price: 88,
      num: 1,
      spec: {},
      existing:[]
    },
	]
 },{
   vendorId: 2, 
   vendorName: "小西瓜之家",
   goods: [
    {
      goodsId: 3, 
      thumb: "https://tva1.sinaimg.cn/large/00831rSTgy1gczok56tkzj30m80m8qe4.jpg",
      name: "上海南汇8424西瓜 1 个 2.8kg 以上/个正宗 8424 脆甜皮薄当季新鲜",
      details: "小瓜（约 3 斤/个）整箱（一箱 4 个）", 
      price: 25,
      num: 1,
      spec: {
        color: ['红', '绿', '蓝'],
        size:['大','中','小'],
        // shape:['长','宽','高'],
       },
      existing:['红-大','红-小','绿-中','绿-大']
      // existing:['红-大-宽','红-小-高','绿-中-宽','蓝-中-长']
    } 
	] 
 }
]

export {listState }