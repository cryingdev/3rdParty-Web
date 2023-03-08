$(document).ready(function () {
    // get user info from URL params
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const party = urlParams.get('via')
    console.log('party' + party)
    if (party === 'naver') {
        const queryString = window.location.hash.substring(1);
        const urlParams = new URLSearchParams(queryString);
        const accessToken = urlParams.get('access_token');
        
        history.replaceState(null, null, window.location.pathname);

        // display user info
        var naver_id_login = new naver_id_login("S4QJn0qRNe62rNtszs7l", "http://localhost:3000/auth/naver/callback");
        // 접근 토큰 값 출력
        //alert(naver_id_login.oauthParams.access_token);
        // 네이버 사용자 프로필 조회
        naver_id_login.get_naver_userprofile("naverSignInCallback()");
        // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
        function naverSignInCallback() {
            const email = naver_id_login.getProfileData('email')
            const nickName = naver_id_login.getProfileData('nickname')
            $('#user-info').text(`Welcome, ${nickName} (${email})`);
        }

    } else if (party === 'kakao') {

    } else { //google
        const name = urlParams.get('name');
        const email = urlParams.get('email');

        // display user info
        $('#user-info').text(`Welcome, ${name} (${email})`);

        // Define a function to log out the user
        function logout() {
            const token = localStorage.getItem('token')

            google.accounts.id.revoke(token, done => {
                window.location.href = '/logout';
            });
        }
    }

    // Attach a click event listener to the logout button
    $('#logout-btn').click(function () {
        logout();
    });

});