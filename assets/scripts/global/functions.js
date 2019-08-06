/*
    初始化云
*/
function initWxCloud(){
    wx.cloud.init({
        traceUser: true
      })
  }


  /*
  获取客户openid
*/
function getOpenId(){
    var openid;
    wx.cloud.callFunction({
        name: 'getinfo',
        complete: res => {
          openid = res.OPENID;
          Global.openId = openid;
          readData(openid);

        }
      })
      console.log('getopenid success')
    return openid;
  }

  /*
  读取微信云函数数据库
*/
function readData(openid){
    var data;
    const db = wx.cloud.database()
      db.collection('userdata').where({
        _openid: openid // 填入当前用户 openid
      }).get({
        success(res) {
          data = res.data;
          console.log('readdata success:',data)
          if(data.length!=0){
            setData(data)
            Global.cloudId = data[0]._id;
          }else{
            addData();
          }
        },
        fail(res){
          console.log(res);
        }
      })
    
  }

  /*
  将读取的数据放入程序
*/
function setData(data){
  var userdata = data[0];
  Global.gold = userdata.gold
  Global.race = userdata.race
  Global.areaName = userdata.areaName
}

  /*
  新增数据到微信云函数数据库
*/
function addData(){
    const db = wx.cloud.database()
    db.collection('userdata').add({
      // data 字段表示需新增的 JSON 数据
      data: {
       //金币数量
        gold : Global.gold,
        race : null,
        areaName : null
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        Global.cloudId = res._id;
      },
      fail(res){
        console.log(res)
      }
    })
  }

  /*
    新增名字种族到云
  */
  function updateData(){
      var newData = {
          areaName : Global.areaName,
          race : Global.race
      }
    const db = wx.cloud.database();
    db.collection('userdata').doc(Global.cloudId).update({
        // // data 字段表示需新增的 JSON 数
          data : newData,
        success(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        }
      })
  }
  
  /*
  更新数据到微信云函数数据库
*/
function saveData(){
    const db = wx.cloud.database();
    db.collection('userdata').doc(Global.cloudId).update({
        // // data 字段表示需新增的 JSON 数
          data : {
          //需要存储的客户数据
          //金币数量
          gold : Global.gold,
      
      },
        success(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        }
      })
    }

window.initWxCloud = initWxCloud;
window.readData = readData;
window.saveData = saveData;
window.getOpenId = getOpenId;
window.addData = addData;
window.setData = setData;
window.updateData = updateData;