from . import StorageInterface
from src.models import ShoppingCart


class TextFileStorage(StorageInterface):
    def __init__(self, file_path: str):
        self.categories_path = f'{file_path}/categories'
        self.product_path = f'{file_path}/products'
        self.shopping_cart_path = f'{file_path}/shopping_carts'


    def get_categories(self):
        ...

    def get_products_by_category(self, category: str) -> list[str]:
        ...

    def save_shopping_cart(self, cart: ShoppingCart):
        try:
            with open(self.shopping_cart_path, 'a') as file:
                file.write(f'{cart.to_dict()}\n')
        except IOError as error:
            print(f"Error writing to file {self.shopping_cart_path}: {error}")
