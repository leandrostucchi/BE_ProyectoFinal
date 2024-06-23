// lado cliente
const socket =  io();

console.log("index.js")

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const price = priceInput.value;
  socket.emit('nuevoProducto', { title, price });
  titleInput.value = '';
  priceInput.value = '';
});


const datoid = document.getElementById('update');
console.log(datoid)
// socket.on("updateProducts", (updatedProducts) => {
//   console.log(updatedProducts)
//     updateProductList(updatedProducts);
// });

socket.on("updProduct", () =>{
  console.log("socket.on updProduct" )
  const form = document.getElementById('productFormUpd');
// //console.log("productFormUpd")  
// form.addEventListener('submit', (e) => {
//       e.preventDefault();
//     console.log("actualizo registro")
//   })
});

// socket.on("updproduct", () =>{
// console.log("index.js productUpd")
// const productName = document.getElementById("productTittle").value;
// console.log(productName)
// // const form = document.getElementById('productFormAdd');
//   // form.addEventListener('submit', (e) => {
//   //     e.preventDefault();
//   //   console.log("inserto registro")
//   // })
// });



// Evento para agregar producto
// document.getElementById("addProductBtn").addEventListener("click", () => {
//   console.log("addProductBtn")
//   const productName = document.getElementById("productName").value;
//   const productPrice = document.getElementById("productPrice").value;

//   if (productName.trim() !== "" && productPrice.trim() !== "") { 
//       socket.emit("addProduct", {
//         description: productName,
//         price: productPrice,
//       });
//       // Limpiar los campos después de agregar el producto
//       document.getElementById("productName").value = "";
//       document.getElementById("productPrice").value = "";
//   } else {
//     alert("Por favor, ingrese un nombre y un precio para el producto.");
//   }
// });

const boton = document.getElementById('updProductBtn')
boton.addEventListener('submit', (e) => {
  console.log("toque boton updProductBtn")
  // const productName = document.getElementById("productName").value;
  // const productPrice = document.getElementById("productPrice").value;

  // if (productName.trim() !== "" && productPrice.trim() !== "") { 
  //     socket.emit("addProduct", {
  //       description: productName,
  //       price: productPrice,
  //     });
  //     // Limpiar los campos después de agregar el producto
  //     document.getElementById("productName").value = "";
  //     document.getElementById("productPrice").value = "";
  // } else {
  //   alert("Por favor, ingrese un nombre y un precio para el producto.");
  // }
});


// Evento para agregar producto
 const form = document.getElementById('productFormUpd');
//document.getElementById("updProductBtn").addEventListener("click", () => {
form.addEventListener('submit', (e) => {
  console.log("updProductBtn")
  // const productName = document.getElementById("productName").value;
  // const productPrice = document.getElementById("productPrice").value;

  // if (productName.trim() !== "" && productPrice.trim() !== "") { 
  //     socket.emit("addProduct", {
  //       description: productName,
  //       price: productPrice,
  //     });
  //     // Limpiar los campos después de agregar el producto
  //     document.getElementById("productName").value = "";
  //     document.getElementById("productPrice").value = "";
  // } else {
  //   alert("Por favor, ingrese un nombre y un precio para el producto.");
  // }
});



// Evento para eliminar producto
document.addEventListener("click", (event) => {
  console.log("boton")
  console.log(event)
  if (event.target.classList.contains("delete-btn")) {
    const productId = event.target.getAttribute("data-product-id");
    console.log(productId)
    socket.emit("deleteProduct",{ productId});
  }
});

function updateProductList(products) {
  console.log(products)
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${product.pid} - ${product.name} - $${product.price}`;

    // Agregar botón de eliminar con el id del producto
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Eliminar";
    deleteButton.setAttribute("data-product-id", product.pid);

    listItem.appendChild(deleteButton);
    productList.appendChild(listItem);
  });
}