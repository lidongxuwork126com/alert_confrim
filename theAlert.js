/**
 *
 * @param infoTitle  顶部标题提示文字
 * @param type       弹窗类型: alert是信息提示框, confirm 是确认框
 * @param callback   如果确认框, 传入一个函数, 接收用户点击结果
 */
function theAlert(infoTitle, type, callback = () => {}) {
    // 遮罩Div
    let alertDiv = document.createElement("div");
    alertDiv.className = "wrap";
    alertDiv.id = "ldxAlert";

    // 中间弹窗div
    alertDiv.innerHTML = `<div class="alert_wrap">
            <div class="alert_top">
                <span>${type === 'alert' ? "信息提示" : "确认框"}</span>
                <div class="close_btn" id="ldxClose">X</div>
            </div>
            <div class="alert_icon">
                <img src="./icon.png" alt="">
            </div>
            <div class="alert_content">
                ${infoTitle}
            </div>
            <div class="confirm_btn_wrap">
                <button class="confirm_btn" id="ldxEnter">确定</button>
                `+  isConfirm()  +`
            </div>
        </div>`;

    // DOM 挂载
    document.body.appendChild(alertDiv);
    // 防止网页滚动
    document.body.style.overflow = "hidden";

    // 判断是否设置取消按钮
    function isConfirm () {
        if (type === "confirm") {
            return `<button class="cancel_btn confirm_btn" id="ldxCancel">取消</button>`
        } else {
            return ``;
        }
    }

    // 关闭遮罩等
    let close = () => {
        let alertDiv = document.getElementById("ldxAlert");
        alertDiv.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(alertDiv);
            document.body.style.overflow = "auto";
        }, 500);
    };

    // 绑定DOM点击事件
    document.getElementById("ldxClose").onclick = () => {
        callback(false);
        close();
    };
    document.getElementById("ldxEnter").onclick = () => {
        callback(true);
        close();
    };
    if (type === "confirm") { // 如果有取消按钮, 再给取消按钮绑定点击事件
        document.getElementById("ldxCancel").onclick = () => {
            callback(false);
            close();
        };
    }
}