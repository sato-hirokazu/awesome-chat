window.onload = function() {
    window.yconnectInit = function () {
        YAHOO.JP.yconnect.Authorization.init({
            button: {    // ボタンに関しては下記URLを参考に設定してください
                        // https://developer.yahoo.co.jp/yconnect/loginbuttons.html
                format: "image",
                type: "a",
                textType:"a",
                width: 196,
                height: 38,
                className: "yconnectLogin"
            },
            authorization: {
                clientId: "dj00aiZpPVFIUnNRb0IxeE01ZiZzPWNvbnN1bWVyc2VjcmV0Jng9Yzc-",    // 登録したClient IDを入力してください
                redirectUri: "http://localhost:8100/signin", // 本スクリプトを埋め込むページのURLを入力してください
                scope: "openid email profile address",
                responseType: "code",
                state: "xxx123xxx",
                nonce: "xxx123xxx",
                windowWidth: "500",
                windowHeight: "400"
            },
            onError: function(res) {
                console.log(res);
                // エラー発生時のコールバック関数
            },
            onCancel: function(res) {
                console.log(res);
                // 同意キャンセルされた時のコールバック関数
            }
        })
    };
    (function(){
    var fs = document.getElementsByTagName("script")[0], s = document.createElement("script");
    s.setAttribute("src", "https://s.yimg.jp/images/login/yconnect/auth/2.0.1/auth-min.js");
    fs.parentNode.insertBefore(s, fs);
    })();
}; 