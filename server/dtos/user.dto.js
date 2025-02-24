module.exports=class {
    id;
    name;
    email;
    role;
    avatar;
    createdAt
    constructor(user){
        this.id=user.id
        this.name=user.name
        this.email=user.email
        this.role=user.role
        this.avatar=user.avatar
        this.createdAt=user.createdAt
    }
}