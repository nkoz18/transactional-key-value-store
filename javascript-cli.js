class KeyValueStore{

  constructor() {
    this.stack = [{}];
    this.currObj = 0;
  }

  set(key, value) {
    this.stack[this.currObj][key] = value;
  }

  get(key) {
    if(key in this.stack[this.currObj]){
      console.log(this.stack[this.currObj][key]);
    }else{
      console.log("key not set");
    }
  }

  delete(key) {
    if(key in this.stack[this.currObj]){
      delete this.stack[this.currObj][key];
    }else{
      console.log("key not set");
    }
  }

  count(value) {
    let count = 0;
    Object.entries(this.stack[this.currObj]).forEach(entry => {
      if(entry[1] === value){
        count++;        
      }
    });
    console.log(count);    
  }

  begin() {
    let newObj = JSON.parse(JSON.stringify(this.stack[this.currObj]));
    this.currObj++;
    this.stack[this.currObj] = newObj;
  }

  commit() {
    if(this.currObj === 0){
      console.log("no transaction to commit");
    }else{
      this.stack[this.currObj - 1] = this.stack.pop();
      this.currObj--;
    }
  }

  rollback() {
    if(this.currObj > 0){
      this.stack.pop();
      this.currObj--;
    }else{
      console.log("no trasaction to rollback");
    }
  }

  print() {
    console.log(this.stack);
  }

}

let store = new KeyValueStore;
const stdin = process.openStdin();
console.log('Starting application ....');

stdin.addListener("data", function(data) {
  
  let input = data.toString().split(" ");
  input[input.length - 1] = input[input.length - 1].slice(0,-2); // remove newline and return from last input string

  if(input.length > 3 || input[0] === ""){
    console.log("invalid input");
  }

  switch(input[0].toLowerCase()) {
    case "set":
      store.set(input[1], input[2]);
      break;
    case "get":
      store.get(input[1]);
      break;
    case "delete":
      store.delete(input[1]);
      break;
    case "count":
      store.count(input[1]);
      break;
    case "begin":
      store.begin();
      break;
    case "commit":
      store.commit();
      break;
    case "rollback":
      store.rollback();
      break;
    default:
      console.log("invalid input");
  }

});