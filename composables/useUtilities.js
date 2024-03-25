export const useUtilities =()=>{
    function toTitleCase(str){
        return str[0].toUpperCase() + str.slice(1);
    }
    return {toTitleCase}
}