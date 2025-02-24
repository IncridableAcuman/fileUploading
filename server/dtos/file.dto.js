module.exports=class{
    id;
    fileName;
    filePath;
    size;
    owner;
    access;
    downloads;
    createdAt;
    constructor(model){
        this.id=model.id;
        this.fileName=model.fileName;
        this.filePath=model.filePath;
        this.size=model.size;
        this.owner=model.owner;
        this.access=model.access;
        this.downloads=model.downloads;
        this.createdAt=model.createdAt;
    }
}