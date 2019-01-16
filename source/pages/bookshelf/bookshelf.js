// pages/bookshelf/bookshelf.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { BookApi } from "../../apis/book.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ty:0})
    
  }
  onMyShow() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    var bookapi = new BookApi();
    
    // setTimeout(function () {
     
    // }, 500)
    this.Base.setMyData({ ty: 0 })
    var memberinfo = this.Base.getMyData().memberinfo;
    // bookapi.readlist({ member_id: memberinfo.id}, (readlist) => {
    //   this.Base.setMyData({ readlist });
    //   for (var i = 0; i < readlist.length; i++) {
        bookapi.booklist({ }, (booklist) => {
          this.Base.setMyData({ booklist });
        });
    //   }
    // });

    bookapi.booktypelist({ }, (booktypelist) => {
      this.Base.setMyData({ booktypelist });
      wx.hideLoading(
      )
    });
    
  }
  bindtypedetail(e){
    var bookapi = new BookApi();
    var type=e.currentTarget.dataset.type;
    var ty=this.Base.getMyData().ty;
    
    this.Base.setMyData({ ty: type });
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    // setTimeout(function () {
    //   wx.hideLoading(
    //   )
    // }, 500)
      bookapi.booklist({ booktype: type }, (booklist) => {
        this.Base.setMyData({ booklist });
        wx.hideLoading(
        )
      });
    
    
    

    
  //   return;
  //   wx.navigateTo({
  //   url: '/pages/typedetail/typedetail?type=' + type,
  //  })

  }
  bindall(e){
    var that = this;
    var bookapi = new BookApi();
    this.Base.setMyData({ ty: 0 });
    wx.showLoading({
      title: '加载中', 
      mask: true
    })

    // setTimeout(function () {
      
    // }, 500)
    
    bookapi.booklist({}, (booklist) => {
      this.Base.setMyData({ booklist });
      wx.hideLoading(
      )
    })
  }
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.bindtypedetail = content.bindtypedetail;
body.bindall = content.bindall;
Page(body)