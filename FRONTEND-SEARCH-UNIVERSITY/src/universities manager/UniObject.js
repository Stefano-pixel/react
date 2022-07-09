exports.UniObject = function(id, name, country, userName){
     this.id = id;
     this.name = name;
     this.country = country;
     this.userName = userName;
     this.toStringUni = function(){
        return this.id + " " + this.name + " " + this.country + " " + this.userName + " " + 
               this.email;
     }
}