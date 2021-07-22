
//初始化面包屑的List
function initBreadcrumb() {
    var breadList = [{
        name: 'Home',
        value: 0
    }]
    sessionStorage.setItem('BREADCRUMB_LIST', JSON.stringify(breadList))

    console.log(breadList)
    var breadcrumbHtml = productBreadcrumb(breadList);
    console.log(breadcrumbHtml)
    console.log('我已经生出来了')
    return breadcrumbHtml
}


//生成面包屑
function productBreadcrumb(breadList) {
    console.log('我已经到这里了 ==== '+breadList.length)
    var breadcrumbHtml = ""
    if (breadList instanceof Array && breadList.length > 0) {
        console.log('到这里！！')
        for (let index = 0; index < breadList.length; index++) {
            if (index == breadList.length - 1) {
                breadcrumbHtml += '<li value="' + breadList[index].value + '">' + breadList[index].name + '</li>'
            } else {
                breadcrumbHtml += '<li value="' + breadList[index].value + '" style="color:blue;cursor: pointer;">' + breadList[index].name + '</li>'
            }
        }
    }
    return breadcrumbHtml;
}


//点击一个新连接，更新下面包屑
function addBreadcrumb(name) {
    var breadListJson = sessionStorage.getItem('BREADCRUMB_LIST')
    breadList = JSON.parse(breadListJson)


    console.log(breadList)
    console.log('看看长度 ==== '+breadList.length)
    var newItem = {
        name: name,
        value: breadList.length
    }
    console.log(newItem)
    
    breadList.push(newItem)
    sessionStorage.setItem('BREADCRUMB_LIST', JSON.stringify(breadList))
    var breadcrumbHtml = productBreadcrumb(breadList)
    return breadcrumbHtml
}



//点击面包屑以为的内容，我们要把面包屑以后的全部给移除掉
function clickBreadcrumb(index) {
    var breadListJson = sessionStorage.getItem('BREADCRUMB_LIST')
    breadList = JSON.parse(breadListJson)

    breadList = breadList.slice(0,index+1)
    sessionStorage.setItem('BREADCRUMB_LIST', JSON.stringify(breadList))
    var breadcrumbHtml = productBreadcrumb(breadList)
    return breadcrumbHtml
}











// // 面包屑回到某个index
// function goBack(index) {
//     let breadcrumbListJson = sessionStorage.getItem('SR_OW_WEB_USER_TOKEN');
//     let breadcrumbList = JSON.parse(breadcrumbListJson)


// }


