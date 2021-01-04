

export function login(email, password, callback, error){
    if(email === 'test' && password === 'test'){
        localStorage.setItem('credentials', JSON.stringify({email: email, password: password}));
        callback();
    } else {
        error();
    }
}

export function logout(callback){
    localStorage.removeItem('credentials');
    callback();
}

export function check(callback, error){
    let cr = JSON.parse( localStorage.getItem('credentials') );
    if( cr ){
        callback();
    } else {
        error();
    }
}
