import {createRequire} from 'module';
const require = createRequire(import.meta.url)
import fetch from "node-fetch";
const GlobalVariables =  require('./GlobalVariables.js');

class ProvaClass {
    metodo1(){
    fetch(GlobalVariables.URL_BE + '/' + GlobalVariables.USER_RESOURCE + '/' + 'login', { 
        method: 'POST',
        body: JSON.stringify(this.userPass),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        } 
      })
      .then(
        this.metodo2.bind(this),
        function fun1(){

        }
      );
      console.log('metodo1')
    }

    metodo2(){
        this.metodo3()
        console.log('metodo2')
    }

    metodo3(){
        console.log('metodo3')
    }
}

var objProvaClass = new ProvaClass();

objProvaClass.metodo1();


