var generateMessage = (from,text)=>{
    return{
        from,
        text,
        completedAt:new Date()
    }
}

var generateLocationMessage = (from,latitude,longitude)=>{
    return{
        from,
        url: `https://google.com/maps/?q=${latitude},${longitude}`,
        createdAt:new Date()
    }
}

module.exports = {generateMessage,generateLocationMessage};