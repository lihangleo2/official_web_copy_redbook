// jQuery网络请求封装




// 环境判断
(function (window) {
  let mainUrl = "";
  // switch(location.host) {
  //   case 'dev.suiren.com':
  //     mainUrl = 'http://dev.suiren.com'
  //     break;
  //   case 'www.suiren.com':
  //   case 'suiren.com':
  //     mainUrl = 'https://www.suiren.com'
  //     break;
  //   default:
  //     mainUrl = 'http://dev.suiren.com'
  // }


  var urlLink = function (str) {
    var url = {
      //注册
      register: {
        method: 'post',
        url: '/index/register'
      },
      //登录
      login: {
        method: 'post',
        url: '/index/login'
      },
      homeHtml: {
        method: 'get',
        url: './home.html'
      },
      newsHtml: {
        method: 'get',
        url: './news.html'
      },
      aboutusHtml:{
        method: 'get',
        url: './aboutus.html'
      },
      addusHtml:{
        method: 'get',
        url: './addus.html'
      }

    };
    return url[str];
  };


  var ajax = function (str, opt) {
    var link = urlLink(str);
    return $.ajax({
      url: mainUrl + link.url,
      type: link.method || 'GET',
      data: opt.data || {},
      cache: opt.cache || true,
      dataType: opt.dataType || 'json',
      contentType: 'application/json',
      timeout: 10000,
      success: function (res) {

        //这句话的意思是，如果是100，token失效，那么跳转到登录页面
        if (res.code == 100) {
          sessionStorage.removeItem('SR_OW_WEB_USER_TOKEN');
          sessionStorage.setItem('SR_OW_WEB_LOGIN_BACK_PAGE', window.location.href);
          window.location.href = './login.html';
        }
        $.type(opt.success) === 'function' && opt.success(res);
      },
      error: function (xhr, error) {
        $.type(opt.error) === 'function' && opt.error(error);
      },
      beforeSend: function (xhr) {
        //发送之前 加上请求头
        var _tk = sessionStorage.getItem('SR_OW_WEB_USER_TOKEN');
        var _Authorization = _tk ? 'boc ' + _tk : '';
        xhr.setRequestHeader('Authorization', _Authorization);
        $.type(opt.beforeSend) === 'function' && opt.beforeSend(xhr);
      },
      complete: function () {
        $.type(opt.complete) === 'function' && opt.complete();
      }
    })
  }
  window.ajax = ajax
})(window)





  // 页面html用法：
  // 请求方法 和 请求url 被我统一在这个js里了
//   ajax("homeHtml", {
//     data: JSON.stringify({
//         phone: phone
//     }),
//     success: function (res) {
//         if (res.code) {
//             window.alert(res.msg);
//         }
//     }
// })