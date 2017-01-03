var Strings = {
    limitCharacters(string, number) {
        if(!number){
            number = 100;
        }
        if(string.length > number){
            return (string.substring(0, number - 3) + '...').trim();
        }else{
            return string.trim();
        }
    }
};
export default Strings;
