$(function () {
    // 点击回车将数据存储到本地
    // $("#title").keydown(function (e) {
    //     console.log(e.keyCode); //回车键keyCode是13
    // })
    loadData()//每次进入页面都重新加载 从而达到保留之前的数据的效果
    $("#title").on("keydown", function (e) {
        if (e.keyCode == 13) {
            // 先获取本地存取的数据 将字符串形式的数据转为数组对象 JSON.parse 再追加回车的文本框内容
            var local = getData();
            console.log(local);
            local.push({ title: $(this).val(), done: false });
            // 数据存储到本地 将数组对象 转为字符串形式 JSON.stringify
            saveData(local);
            // 加载页面数据
            loadData();
            $(this).val("");
        }
    })

    // 点击a完成删除 删除的是本地的数据不是li 
    $("ol,ul").on("click", "a", function () {
        var data = getData();
        // 获取所点击数据的自定义名称序号 arr
        var index = $(this).attr("Aname");
        // 删除本地存储的数据 
        data.splice(index, 1);//删除index一条 从index开始删除一条 即删除本身li
        // 数据保存到本地
        saveData(data);
        // 重新加载页面
        loadData();
    })

    // 点击复选框 修改正在进行中和已完成的li的内容
    $("ol ,ul").on("click", "input", function () {
        // 判断复选框若被选中，则修改done值为TRUE 此时就在ul中动态创建li且复选框默认状态为选中状态
        var data = getData();
        var index = $(this).siblings("a").attr("Aname");
        data[index].done = $(this).prop("checked");
        saveData(data);
        loadData();
    })
    // 获取本地数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data != null) {
            return JSON.parse(data);
        }
        else {
            return [];
        }
    }
    // 存储数据到本地
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 加载数据到页面中
    function loadData() {
        var data = getData();
        $("ol,ul").empty();//每次加载页面就将之间创建的li删除 避免下次重复出现
        var todocount = 0;
        var donecount = 0;
        // 遍历每一条获取的数据
        $.each(data, function (i, ele) {
            if (ele.done) {
                // 给动态创建的li中的a添加自定义名称 得到相应的索引号
                $("ul").prepend("<li><input type='checkbox' checked='checked'> <p>" + ele.title + "</p> <a href='javascript:;' Aname=" + i + "></a></li>");
                donecount = $("ul").children("li").length;
            }
            else {
                // 给动态创建的li中的a添加自定义名称 得到相应的索引号
                $("ol").prepend("<li><input type='checkbox' > <p>" + ele.title + "</p> <a href='javascript:;' Aname=" + i + "></a></li>");
                todocount = $("ol").children("li").length;
            }
        })
        $("#donecount").text(donecount);
        $("#todocount").text(todocount);
    }
})
