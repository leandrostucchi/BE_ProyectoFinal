import fs from 'fs';

//const datos = [{"tittle":"producto prueba1","description":"Este es un producto prueba1","price":2,"thumbnail":"Sin imagen1","code":"abc111","stock":21,"status":true,"pid":1},{"tittle":"producto prueba2","description":"Este es un producto prueba2","price":2,"thumbnail":"Sin imagen2","code":"abc222","stock":21,"status":true,"pid":2},{"tittle":"producto prueba3","description":"Este es un producto prueba3","price":2,"thumbnail":"Sin imagen3","code":"abc333","stock":21,"status":true,"pid":3}]

export class productManager{
    static pid = 0;        

    constructor (){
        this.path = './src/public/js/products.json';
        this.products= [];
    }

    validateData(tittle,description,price,thumbnail,code,stock){
        let mensajes = this.controlDatos(tittle,"String");
        mensajes += this.controlDatos(description,"String");
        mensajes += this.controlDatos(price,"Number");
        mensajes += this.controlDatos(thumbnail,"String");
        mensajes += this.controlDatos(code,"String");
        mensajes += this.controlDatos(stock,"Number");
        mensajes += this.getFindByCode(code);
        return mensajes;
    }

    controlDatos(variable,tipo) {
        //? controla cada campo que este cargado
        if (variable === null || variable === undefined || variable === '') {
            return "No ingreso dato \n";
        }
        switch (tipo) {
            case "String":
                if(variable.length<3) return "Debe ser mayor a 3 digitos\n";
                break;
            case "Number":
                if(!this.EsNumerico(variable))  return "No Es un numero\n";
                break;
            default:
                break;
        }
        return '';
    }

    EsNumerico(numero){
        let valor = parseInt(numero);
        if(typeof(valor) != "number"){
            return false;
        }
        return true;
    }

    addProduct(tittle,description,price,thumbnail,code,stock){
        //let mensaje = this.validateData(tittle,description,price,thumbnail,code,stock);
        //if(mensaje == ''){
            productManager.pid++;
            this.products.push({tittle,description,price,thumbnail,code,stock,status:true,pid: productManager.pid});
            this.addFile(this.path,this.products,'Se inserto el registro');
        //}else{
            //return `Mensaje de error: ${mensaje}`;
        //}
    }

    delArchivo = async() => {
        await fs.promises.unlink(this.path);
    }

    updProduct(tittle,description,price,thumbnail,code,stock,pid,productos){
        let productsOld =productos;
        let mensaje = this.validateData(tittle,description,price,thumbnail,code,stock);
        if(mensaje == ''){
            for (let index = 0; index < productsOld.length; index++) {
                if(productsOld[index].pid === pid)    productsOld[index] = {tittle,description,price,thumbnail,code,stock,pid};
             }
             return this.addFile(this.path,productsOld,'Se actualizo el registro');             
        }else{
            return `Mensaje de error: ${mensaje}`;
        }

    }

    readProducts = async()=>{
        let resultado = await fs.promises.readFile(this.path,"utf-8")
                                         .catch(()=> 'Sin Datos');            
        if(resultado && resultado!='Sin Datos') return JSON.parse(resultado);
        return '';
    }

    getProducts = async ()=> {
       let productos = await this.readProducts();
       if (productos) return productos;
       return 'Sin Datos';
    }

    readProductByID= async(pid) => {
        let producto =  await this.readProducts();
        if (producto) return producto.some(x=> x.pid === pid) ?  producto.find(x=> x.pid === pid) : `Id Not Found ${pid}`;
    }


    getFindByCode= (code) => {
        let producto = this.products;
        return producto.some(x=> x.code === code) ? `codigo repetido ${code}` : '';
    }

    readProductWhitOutID= async(pid) => {
        let producto =  await this.readProducts();
        if (producto) return producto.filter(x=> x.pid !== pid);
        return '';
    }

    getProductById = async(pid) => {
        let producto =  await this.readProductByID(pid);
        if(producto) return producto;
        return 'Sin datos';
    }

    existProductByID= async(pid) => {
        let producto =  await this.readProducts();
        if (producto) return producto.some(x=> x.pid === pid);
        return false;
    }

    getProductByLimit = async(limit) => {
        let producto =  await this.readProducts();
        if (producto) return producto.slice(0,limit);
        return 'Sin datos';
    }

    addFile = async (archivo,registro,mensaje)=>{
        let log =JSON.stringify(registro);
        await fs.promises.writeFile(archivo, log)
            .then(() => `${mensaje}`)
            .catch((err) => err)
    }

    deleteProduct = async(pid) =>{
        let producto =  await this.readProductWhitOutID(pid);
        console.log("eliminacion por pid " + pid)
        console.log(producto)
        if(producto) this.addFile(this.path,producto, `Elimino Id ${pid}`);
    }

    updateProduct = async(tittle,description,price,thumbnail,code,stock,pid) =>{        
        let productos =  await this.readProducts();
        await this.updProduct(tittle,description,price,thumbnail,code,stock,pid,productos);
     }
}


export default productManager = new productManager();

//? Test
//let productoNuevo = new productManager();
//productoNuevo.delArchivo();

// productoNuevo.addProduct('producto prueba1','Este es un producto prueba1',200,'Sin imagen1','abc123',25);
// productoNuevo.addProduct('producto prueba2','Este es un producto prueba2',200,'Sin imagen2','abc124',25);
// productoNuevo.addProduct('producto prueba3','Este es un producto prueba3',200,'Sin imagen3','abc121',25);
// productoNuevo.addProduct('producto prueba3','Este es un producto prueba3',200,'Sin imagen3','abc123',25); //codigo duplicado

//productoNuevo.getProducts();

//productoNuevo.getProductById(1);
// productoNuevo.getProductById(5);

//productoNuevo.deleteProduct(3);

//productoNuevo.updateProduct('producto prueba2','Este es un producto prueba2',400,'Sin','abc124',25,2);
//productoNuevo.updateProduct('prueba1','Este es un producto prueba1',200,'Sin imagen1','abc123',125,1);

