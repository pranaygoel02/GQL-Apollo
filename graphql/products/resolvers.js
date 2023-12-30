const Product = require('../../models/productSchema');

const resolvers = {
    Query: {
        async product (_, {ID}) {
            return await Product.findById(ID);
        },
        async getProducts (_, {amount}) {
            return await Product.find().limit(amount ?? undefined).sort({createdAt: -1});
        }
    },
    Mutation: {
        async createProduct (_, {input: {name, description, price}}) {
            const product = new Product({name, description, price});
            await product.save();
            return {
                id: product._id,
                ...product._doc
            };
        },
        async deleteProduct (_, {ID}) {
            const deletedProduct = await Product.findByIdAndDelete(ID);
            return deletedProduct;
        },
        async updateProduct (_, {ID, input: {name, description, price}}) {
            const updatedProduct = await Product.findByIdAndUpdate(ID, {name, description, price}, {new: true, upsert: true});
            return updatedProduct;
        }
    }
}

module.exports = resolvers;