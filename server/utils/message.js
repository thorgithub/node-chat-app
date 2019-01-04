var generateMessage = (from,text)=>{
    return{
        from,
        text,
        completedAt:new Date().getDay()
    }
}

module.exports = {generateMessage};