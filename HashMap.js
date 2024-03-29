class HashMap{
    constructor(){
        this.capacity = 16;
        this.size = 0;
        this.keys = new Array();
        this.storage = new Array();
    }
    hash(key) {
        let hashCode = 0;
    
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
    
        return hashCode;
    }
    set(key, value){
        console.log(value + ": " + key, key%16);
        if(this.keys[key%16] == null){
            this.keys[key%16] = key;
            this.storage[key%16] = value;
        }
        else if(this.keys[key%16] == key){
            this.keys[key%16] = key;
            this.storage[key%16] = value;
        }
        else{
            
            const oldKey = this.keys[key%16];
            const oldValue = this.storage[key%16];
            this.keys[key%16] = [oldKey, key];
            this.storage[key%16] = [oldValue, value];
        }
        
        this.size++;
    }
    get(key){
        const ogKey = key;
        key %= 16;
        if (key < 0 || key >= this.storage.length) {
            throw new Error("Trying to access index out of bound");
        }
        else{
            if(Array.isArray(this.storage[key])){
                for(let i = 0; i < this.keys.length; i++){
                    if(this.keys[key][i]!= null){
                        if(this.keys[key][i] == ogKey){
                            return this.storage[key][i];
                        }
                    }
                }
                
            }
            else if(this.storage[key] != null){
                return this.storage[key];
            }
            else{
                return null;
            }
        }
    }
    has(key){
        key %= 16;
        if (key < 0 || key >= this.storage.length) {
            return false
        }
        else{
            return (this.storage[key] == null) ? false : true;
        }
    }
    remove(key){
        if(this.has(key)){
            const ogKey = key;
            key %= 16;
            if(Array.isArray(this.storage[key])){
                for(let i = 0; i < this.keys.length; i++){
                    if(this.keys[key][i]!= null){
                        if(this.keys[key][i] == ogKey){
                            this.storage[key].splice([i], 1);
                            this.keys[key].splice([i], 1);
                            this.size -= 1;
                            return true;
                        }
                    }
                }
                
            }
            else{
                this.storage.splice(key, 1);
                this.keys.splice(key, 1);
                this.size -= 1;
                return true
            }
            
        }
        else{
            return false
        }
    }
    length(){
        return this.size;
    }
    clear(){
        this.storage = new Array();
        this.keys = new Array();
        this.size = 0;
    }
    Keys(){
        let myKeys = [];
        this.keys.forEach(element => {
            myKeys.push(element);
        });
        return myKeys;
    }
    values(){
        let values = [];
        this.storage.forEach(element => {
            values.push(element);
        });
        return values;
    }
    entries(){
        let allEntries = [];
        for(let i = 0; i < this.storage.length; i++){
            if(this.storage[i] != null){
                allEntries.push([this.keys[i], this.storage[i]]);
            }
        }
        return allEntries;
    }
}
const myHashMap = new HashMap();
myHashMap.set(myHashMap.hash("Carlos"), "32 Yearls Old");
myHashMap.set(myHashMap.hash("Robert"), "21 Yearls Old");
myHashMap.set(myHashMap.hash("Maia"), "77 Yearls Old");
myHashMap.set(myHashMap.hash("Clark"), "24 Yearls Old");
console.log(myHashMap.entries());