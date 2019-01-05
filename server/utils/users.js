class Users {
    constructor(){
        this.users = [];
    }
    addUser(id,name,room){
        var user = {id,name,room}
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var user = this.users.filter((user)=>user.id === id)
        
        if(user){
            this.users = this.users.filter((user)=>user.id != id)        
        }
        
        return user[0];
    }
    getUser(id){
        return this.users.filter((user)=>user.id === id)[0]
        // return user;
    }
    getUserList(room){
        var users = this.users.filter((user)=>user.room === room);
        var arrayList = users.map((user)=>user.name);
        return arrayList;
    }

}

module.exports = {Users};