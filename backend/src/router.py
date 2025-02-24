from fastapi import APIRouter, Request
from fastapi.params import Depends

from src.models import ProductSForCategoryRequest, ShoppingCart, ShoppingCartRequest
from src.storage_adapters import StorageInterface
from . import utils

router = APIRouter()


@router.get('/product_categories')
def get_product_categories(storage: StorageInterface = Depends(utils.get_storage)):
    categories = storage.get_categories()
    return {'categories': categories}



@router.get('/products_by_category')
def get_products_by_category(
    request: ProductSForCategoryRequest = Depends(),
    storage: StorageInterface = Depends(utils.get_storage)
):
    products = storage.get_products_by_category(request.category)
    start = (request.page - 1) * request.page_size
    end = start + request.page_size
    paginated_products = products[start:end]
    return {
        'products': [
            product.to_dict()
            for product in paginated_products
        ]
    }


@router.post('/save_shopping_cart')
def save_shopping_cart(
    cart_request: ShoppingCartRequest,
    request: Request,
    storage: StorageInterface = Depends(utils.get_storage)
):
    client_ip = request.client.host
    items = {item.product.name: item.quantity for item in cart_request.items}

    shopping_cart = ShoppingCart(
        client_ip=client_ip,
        items=items,
        total_items=cart_request.total_items,
        total_price=cart_request.total_price
    )

    storage.save_shopping_cart(shopping_cart)
    return {'message': 'Shopping cart saved successfully', 'cart': shopping_cart.to_dict()}
