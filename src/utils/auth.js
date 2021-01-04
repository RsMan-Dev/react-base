import {ajax_post, ajax_get} from "./fetcher";

export function login(email, password, callback, error){
    ajax_post(process.env.REACT_APP_API_URL + 'login',
        {},
        {
            email: email,
            password: password
        },
        false,
        function(data){
        console.log(data);
            if(data.token){
                localStorage.setItem('session_token',data.token)
                if(callback) callback();
            }else{
                if(error) error(data);
            }
        },function (data){
            if(error) error(data);
        }
    );
}

export function logout(callback, error){
    if(localStorage.getItem('session_token')){
        ajax_post(process.env.REACT_APP_API_URL + 'logout',
            {},
            {
                token: localStorage.getItem('session_token'),
            },
            false,
            function(data){
                localStorage.setItem('session_token',undefined);
                if(callback) callback(data);
            },function (data){
                localStorage.setItem('session_token',undefined);
                if(error) error(data);
            }
        );
    }else{
        localStorage.setItem('session_token',undefined);
        if(error) error("undefined token");
    }
}
export function checkToken(callback, error){
    if(localStorage.getItem('session_token')){
        ajax_get(process.env.REACT_APP_API_URL + 'verify',
            {},
            localStorage.getItem('session_token'),
            function(data){
                if(callback) callback(data);
            },function (data){
                if(error) error(data);
            }
        );
    }else{
        if(error) error("invalid");
    }
}
