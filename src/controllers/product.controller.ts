// src/controllers/ItemController.ts
import { Controller, Route, Body, Post, Path, Get, Put, Response, Delete, Middlewares, Queries } from 'tsoa';
import { ProductCreateRequest, ProductGetAllRequest, ProductUpdateRequest } from '../controllers/types/product-request.type';
import ProductService from '../services/product.service';
import validateRequest from '../middlewares/validate-input';
import { ProductPaginatedResponse, ProductResponse } from '../controllers/types/product-response.type';
import { productCreateSchema } from './schema/productCreateSchema';

@Route('v1/products')
export class ProductController extends Controller {
	// Add this: the request might look like: /v1/products?page=1&limit=5&filter={"price":{"min": 2, "max":5}}&sort={"name": "desc"}
  @Get()
  public async getAllProducts(@Queries() queries: ProductGetAllRequest): Promise<ProductPaginatedResponse> {
    try {
      const response = await ProductService.getAllProducts(queries);

      return {
        message: "success",
        data: response
      }

    } catch (error) {
      console.error(`ProductsController - getAllProducts() method error: ${error}`)
      throw error;
    }
  }

  @Post()
  @Response(201, 'Created Success')
  @Middlewares(validateRequest(productCreateSchema))
  public async createItem(@Body() requestBody: ProductCreateRequest): Promise<ProductResponse> {
    try {
      const newProduct = await ProductService.createProduct(requestBody);

      return {
        message: "success",
        data: {
          name: newProduct.name,
          category: newProduct.category,
          price: newProduct.price
        }
      }
    } catch (error) {
      throw error;
    }
  }

  @Get('{id}')
  public async getItemById(@Path() id: string): Promise<ProductResponse> {
    try {
      const product = await ProductService.getProductById(id);

      return {
        message: "success",
        data: product
      };
    } catch (error) {
      throw error;
    }
  }

  @Put('{id}')
  public async updateItem(@Path() id: string, @Body() requestBody: ProductUpdateRequest): Promise<ProductResponse> {
    try {
      const updatedProduct = await ProductService.updateProduct(id, requestBody);

      return { message: 'success', data: updatedProduct };
    } catch (error) {
      throw error;
    }
  }

  @Delete('{id}')
  @Response(204, 'Delete Success')
  public async deleteItemById(@Path() id: string): Promise<void> {
    try {
      await ProductService.deleteProduct(id);

    } catch (error) {
      throw error;
    }
  }
}