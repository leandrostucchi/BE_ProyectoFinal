import { productsService } from "../services/products.service.js";
import { PaginationParameters }  from 'mongoose-paginate-v2';

const getAllProducts = async(req,res)=>{
    console.log("getAllProducts")
    let products = await productsService.getAll().lean();
    //res.send({status:"success",payload:products})
    //res.render("products",{products})
    console.log(products)
    res.status(200).render("products",{
        docs:products,
        isValid:true
        //,
        // page:resultado.page,
        // hasNextPage: resultado.hasNextPage,
        // nextLink:resultado.nextLink,
        // hasPrevPage: resultado.hasPrevPage,
        // prevLink:resultado.prevLink
    });
}

const getProductsPaginate = async(req,res)=>{
    let body= req.body;
    //console.log(res.body)
    //console.log(new PaginationParameters(req))
    let sort = new PaginationParameters(req).query.sort;
    let fullUrl = req.protocol + '://' + req.get('host') + req.path;
    //let fullUrl = 'http://localhost:9080/api/products'
    //let fullUrl = 'http://localhost:6080/products'
    let page = parseInt(req.query.page)|| null;
    let limit = parseInt(req.query.limit) || null;
    let resultado= null;
    let sortModo= parseInt(req.query.sort) || null;
   //console.log("tengo fullUrl " + fullUrl)
    let ordenadoPor= null;
    if(sort){ 
        ordenadoPor =  {'price':sortModo?sortModo:1 };
    }
    try {
        resultado =await productsService.getProductsPaginate({}
            ,{
                page:  page?page:1,
                limit: limit?limit:10,
                sort:  ordenadoPor,
                lean:  true
            })
        let totalPages= resultado.totalPages;
        let prevPage=resultado.prevPage;
        let nextPage=resultado.nextPage;
        page=resultado.page;
        limit=resultado.limit;
        ordenadoPor = sort;
        let hasPrevPage=resultado.hasPrevPage;
        let hasNextPage=resultado.hasNextPage;
        let datosPrev = null;
        let datosNext = null;
        if(hasPrevPage){
            datosPrev = `?page=${prevPage}`;
            datosPrev = limit?`${datosPrev}&limit=${limit}`:datosPrev;
            datosPrev = limit?`${datosPrev}&lean=true`:datosPrev;
            datosPrev = ordenadoPor?`${datosPrev}&sort=${ordenadoPor}`:datosPrev;
            console.log("datosPrev" + datosPrev)
        }

        if(hasNextPage){
            datosNext = `?page=${nextPage}`;
            datosNext = limit?`${datosNext}&limit=${limit}`:datosNext;
            datosNext = limit?`${datosNext}&lean=true`:datosNext;
            datosNext = ordenadoPor?`${datosNext}&sort=${ordenadoPor}`:datosNext;
            console.log("datosNext" + datosNext)
        }
        
        
        resultado.prevLink = hasPrevPage?`${fullUrl}${datosPrev}`:'';
        let prevLink = resultado.prevLink;
        resultado.nextLink = hasNextPage?`${fullUrl}${datosNext}`:'';
        let nextLink = resultado.nextLink;
        let isValid= resultado.isValid= !(page<=0||page>totalPages);
        //console.log(resultado)
        res.status(200).render("products",{
            docs:resultado.docs,
            isValid:isValid,
            page:resultado.page,
            hasNextPage: resultado.hasNextPage,
            nextLink:resultado.nextLink,
            hasPrevPage: resultado.hasPrevPage,
            prevLink:resultado.prevLink
    

        });
    } catch (error) {
        console.log(`Mensaje de error: ${error}`)
        res.status(500).send({
            status:500,
            result:"error",
            error:"Error getting data from DB"
        });
    }
}


const getProductById = async(req,res)=>{
    let id = req.params.pid;
    console.log("getProductById " + id);
    try{
        let product = await productsService.getBy({_id:id}).lean()
        if(!product) res.status(404).send({status:"error",error:"Not found"})
        //res.send({status:"success",payload:product})

        res.status(200).render("productsUpd",{products:product});

    }catch(error){
        console.log(error);
    }
}
const saveProduct =  async(req,res)=>{
    loggersUtil.logger.info('saveProduct');
    let {title,description,code,stock,price} = req.body;
    if(!title||!description||!code||!stock||!price)
    {
        loggersUtil.logger.error('saveProduct Error:' + "Incomplete values");
         return res.status(400).send({status:"error",error:"Incomplete values"});
    }
    await productsService.create({
        title,
        description,
        code,
        stock,
        price
        //thumbnail:req.file.location
    })
    res.send({status:"success",message:"Product added"})
}
const updateProduct = async(req,res)=>{
    console.log("updateProduct")
    let {pid} = req.params;
    let content = req.body;
    console.log("req.params" + JSON.stringify(req.params))
    console.log("req.body" + JSON.stringify(req.body))
    let product = await productsService.getBy({_id:pid})
    if(!product) res.status(404).send({status:"error",error:"Not found"})
    await productsService.update(pid,content)
    res.send({status:"success",message:"Product updated"})
}
const deleteProduct = async(req,res)=>{
    let {pid} = req.params;
    let product = await productsService.getBy({_id:pid})
    if(!product) return res.status(404).send({status:"error",error:"Not found"})
    await productsService.delete(pid)
    res.send({status:"success",message:"Product deleted"})
}

const getProductoUpdate = async(req,res)=>{
    let id = req.params.pid;
    try{
        let product = await productsService.getBy({_id:id}).lean()
        if(!product) res.status(404).send({status:"error",error:"Not found"})
        res.status(200).render("productsUpd",{products:product});
    }catch(error){
        console.log(error);
    }
}

const getProductoNew = async(req,res)=>{
    console.log("getProductoNew")
    try{
        res.status(200).render("productsNew");
    }catch(error){
        console.log(error);
    }
}


export const ProductController  = {
    getAllProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct,
    getProductsPaginate,
    getProductoUpdate,
    getProductoNew,
}