; (function ($) { //IIFEs = Immediately Invoked Function Expression // ; =>防止被拼裝
    var len;

    $(document).ready(function () {
        $('#search').keypress(function (e) {
            if (e.which === 13) {
                e.preventDefault(); //enter will make the web refresh
                searchFunc();
            }
        });
        $('#submit').click(function () {
            searchFunc();
        });
        var ini = 0, end = 50;
        getJs(ini, end);
        $('.up').click(function () {
            if (ini == 0) {
                alert("沒有上一頁!!! ˋ^ˊ");
            } else {
                ini -= 50;
                end -= 50;
                getJs(ini, end);
            }
        });
        $('.next').click(function () {
            ini += 50;
            end += 50;
            if (ini < len) {
                getJs(ini, end);
            }
            else {
                alert("最後一頁了!!! ˋ^ˊ");
            }
        });

    });

    function getJs(ini, end) {
        $.getJSON("./index_file/data.JSON", function (res) {
            setOri();
            len = res['retVal'].length;
            $(res['retVal']).each(function (index, item) {
                var html_wr = '';
                if (index < end && index >= ini) {
                    html_wr += '<tr><th>' +
                        item['sarea'] + '</th><th>' +
                        item['ar'] + '</th><th>' +
                        item['sna'] + '</th><th>' +
                        item['tot'] + '</th></tr>';
                    $("#table").after(html_wr);
                }
            })
        });
    }

    function searchFunc() {
        const area = clearSpace(document.getElementById("search").value);
        document.getElementById("search").value = area;
        $.getJSON("./index_file/data.JSON", function (res) {
            var isAreaExist = false;
            setOri();
            $(res['retVal']).each(function (index, item) {
                var html_wr = '';
                if (item['sarea'].includes(area) && area !== "區" && area !== "") {
                    isAreaExist = true;
                    html_wr += '<tr><th>' + item['sarea'] + '</th><th>' +
                        item['ar'] + '</th><th>' +
                        item['sna'] + '</th><th>' +
                        item['tot'] + '</th></tr>';
                    $("#table").after(html_wr);
                }
            })
            if (!isAreaExist && area !== "區" && area !== "") {
                alert('查無此區');
                document.getElementById("search").value = '';
                location.reload();
            } else if (area === "區" || area === "") {
                document.getElementById("search").value = '';
                location.reload();
            }
        });
        $('.footer').empty();
    }

    function setOri() {
        $('.clear').empty();
        var insert = '<table class="clear"><tr id="table"><td>區域</td>\
    <td>地址</td><td>站點名稱</td><td>總數</td>\
    </tr></table>';
        $(".info").append(insert);
    }

    function setFooter() {
        $('.footer').empty();
        var insert = '<footer class="footer">\
        <button class="up">上一頁</button>\
        <button class="next">下一頁</button>\
        </footer>';
        $(".info").after(insert);
    }

    function clearSpace(area) {
        var str = area.trim().split(/\s+/);
        area = '';
        str.forEach(element =>
            area += element
        );
        return area;
    }
})($);
