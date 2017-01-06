var maxStringLength = 128;

var validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

module.exports = {
    user: function(attrs){
        if(!attrs.name || attrs.name.length <= 0 || attrs.name.length > maxStringLength){
            return 'Invalid Name';
        }
        if(!attrs.email || attrs.email.length <= 0 || attrs.email.length > maxStringLength || !validateEmail(attrs.email)){
            return 'Invalid Email';
        }
        if(!attrs.password || attrs.password.length <= 0 || attrs.name.password > maxStringLength){
            return 'Invalid Password';
        }
        if(!attrs.role || (attrs.role !== 1 && attrs.role !== 2)){
            return 'Invalid Role';
        }
        return true;
    },
    task: function(attrs){
        if(!attrs.name || attrs.name.length <= 0 || attrs.name.length > maxStringLength){
            return 'Invalid Name';
        }
        if(!attrs.due){
            return 'Invalid Due Date';
        }
        if(!attrs.ownerId || attrs.ownerId <= 0){
            return 'Invalid Owner';
        }
        if(!attrs.userId || attrs.userId <= 0){
            return 'Invalid User';
        }
        if(!attrs.status === 1 && !attrs.status === 2 && !attrs.status === 3){
            return 'Invalid Status';
        }
        if(attrs.file && attrs.file.length > 10485760){
            return 'Invalid File';
        }
        return true;
    }
}
