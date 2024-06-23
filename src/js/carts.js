const fs  = require("fs")


class cartsManager{
    static cid = 0;        

    constructor (){
        this.path = './carts.json';
        this.cart= [];
    }

    initProduct = async()=>{
        cartsManager.cid++;
        let cartOld =  await this.readCarts();
        if(cartOld=== ''){
            this.cart.push({cid: cartsManager.cid,product:[]});
        }else{
            this.cart = [{cid: cartsManager.cid,product:[]},...cartOld]
        }
        this.addFile(this.path,this.cart,'Se inicializo el registro');
    }

    addFile = async (archivo,registro,mensaje)=>{
        let log =JSON.stringify(registro);
        await fs.promises.writeFile(archivo, log)
            .then(() => `${mensaje}`)
            .catch((err) => err)
    }

    delArchivo = async() => {await fs.promises.unlink(this.path);}

    readCarts = async()=>{
        let resultado = await fs.promises.readFile(this.path,"utf-8")
                                         .catch(()=> 'Sin Datos');            
        if(resultado && resultado!='Sin Datos') return JSON.parse(resultado);
        return '';
    }

    readCartByID= async(cid) => {
        let cart =  await this.readCarts();
        if (cart) return cart.some(x=> x.cid === cid) ?  cart.find(x=> x.cid === cid) : `Id Not Found ${cid}`;
    }

    existCartByID= async(cid) => {
        let cart =  await this.readCarts();
        if (cart) return cart.some(x=> x.cid === cid);
        return false;
    }


    getCarts = async ()=> {
       let cart = await this.readCarts();
       if (cart) return cart;
       return 'Sin Datos';
    }


    updateCart = async(cid,pid,quantity) =>{        
        let cart= await this.readCarts();
        await this.updCart(cid,pid,quantity,cart);
     }


    updCart(cid,pid,quantity,cart){
        if(!cart.some(x=> x.cid === cid)) return 'no existe ese codigo'
        for (let indexCart = 0; indexCart < cart.length; indexCart++) {
            if(cart[indexCart].cid === cid){
                let positionCart = cart[indexCart].product.findIndex(x=> x.pid === pid)
                if(positionCart==-1){
                    cart[indexCart].product.push({pid,quantity})
                }else{
                    let slice =  cart[indexCart].product[positionCart].quantity+quantity;
                    cart[indexCart].product[positionCart]= {pid,quantity:slice}
                }
            }
        }
        this.addFile(this.path,cart,'Se inicializo el registro');
   }

    // deleteCart = async(pid) =>{
    //     let producto =  await this.readProductWhitOutID(id);
    //     if(producto) this.addFile(this.path,producto, `Elimino Id ${id}`);
    // }

}

//module.exports = new cartsManager();

