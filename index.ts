import { Sequelize, DataTypes, Model } from 'sequelize'
import { User } from './db/user';
import { iniciarDatabase, sequelize } from './db';
import { Product } from './db/product';
import './db/index'
import * as dotoenv from 'dotenv'
import { app } from './express';
dotoenv.config();
const PORT = process.env.APP_PORT;
type Producto = {
    precio: number,
    title: string
}

(async () => {
    //PRIMERO CREO EL MODEL, LUEGO ME CONECTO Y LE ESPECIFICO CON .SYNC ALTER{TRUE} Y POR ULTIMO REALIZO LAS QUERYS


    await iniciarDatabase();

    app.get('/products', async (req, res) => {
        const listaDeProductos = await Product.findAll();
        if (listaDeProductos) {
            res.status(200).json(listaDeProductos);
        } else {
            res.status(400).send("Algo salio mal")
        }
    });

    app.get('/products/:productId', async (req, res) => {
        const { productId } = req.params;

        const productoBuscado = await Product.findByPk(productId);

        if (productoBuscado) {
            res.status(200).json(productoBuscado);
        } else {
            res.status(400).send(`El producto con el id ${productId} no se encontro, consulte /products para recibir todos los productos con sus ids`);
        }
    });

    //MODIFICO UN PRODUCTO CON EL ID
    app.patch('/products/:productId', async (req, res) => {
        const { productId } = req.params;
        const { precio, title } = req.body;

        const productoModificado = await Product.update(
            {
                title,
                precio
            },
            {
                where: {
                    id: productId
                }
            }
        );

        if (productoModificado) {
            res.status(200).send(`Producto con id : ${productId} modificado con exito`);
        } else {
            res.status(400).send(`No se encontro el producto con el id : ${productId}, consulte /products para recibir todos los productos con sus ids `)
        }
    });


    //BORRO UN PRODUCT POR SU ID EN LA BD
    app.delete('/products/:productId', async (req,res) =>{
        const { productId } = req.params;
        console.log(productId)

        const productoBorrado = await Product.destroy({
            where : {
                id : productId
            }
        })

        if(productoBorrado){
            res.status(200).send(`Producto con id ${productId} BORRADO`);
        }else{
            res.status(400).send(`No se encontro el producto con el id : ${productId}, consulte /products para recibir todos los productos con sus ids `);
        }

    });
    //CREO UN PRODUCT EN LA BD
    app.post('/products', async (req, res) => {
        const { precio, title } = req.body;

        if (!precio || !title) {
            res.status(400).send("Falta uno, envie un precio : ENTERO y un title : STRING")
        } else {
            const productoNuevo: Producto = {
                precio: req.body.precio,
                title: req.body.title
            };
            const userCreado = await Product.create({
                precio: productoNuevo.precio,
                title: productoNuevo.title
            });
            res.status(200).json(userCreado.toJSON());
        }
    })


    app.listen(PORT, () => {
        console.log(`Server running in PORT : ${PORT}`)
    })

})();


// const pruebaUser = await User.create({
//     username : "pruebausername5",
//     lastname : "pruebalastname5",
//     birthday : "1995-05-05"
// });
// console.log("User creado : ", pruebaUser.toJSON());

// const userCreados = await User.findAll();
// console.log(userCreados.map(elemento => elemento.dataValues));

// const pruebaProduct = await Product.create({
//   precio : 1000,
//   title : "Prueba Producto 1"
// });
// console.log('Product Creado : ', pruebaProduct.toJSON());
// const productosCreados = await Product.findAll();
// console.log(productosCreados.map(producto => producto.dataValues));