var maxStringLength = 128;

module.exports = {
    user:{
        create: function(attrs){
            if(!attrs.name || attrs.name.length <= 0 || attrs.name.length > maxStringLength){
                return 'Invalid Name';
            }
            if(!attrs.email || attrs.email.length <= 0 || attrs.name.email > maxStringLength){
                return 'Invalid Email';
            }
            if(!attrs.password || attrs.password.length <= 0 || attrs.name.password > maxStringLength){
                return 'Invalid Password';
            }
            if(!attrs.role || (attrs.role !== 1 && attrs.role !== 2)){
                return 'Invalid Role';
            }
            return true;
        }
    },
    task:{
        create: function(attrs){
            // if(!attrs.name || attrs.name.length <= 0 || attrs.name.length > maxStringLength){
            //     return 'Invalid Name';
            // }
            // if(!attrs.email || attrs.email.length <= 0 || attrs.name.email > maxStringLength){
            //     return 'Invalid Email';
            // }
            // if(!attrs.password || attrs.password.length <= 0 || attrs.name.password > maxStringLength){
            //     return 'Invalid Password';
            // }
            // if(!attrs.role || (attrs.role !== 1 && attrs.role !== 2)){
            //     return 'Invalid Role';
            // }
            return true;
        }
    }
}
