from pymongo import MongoClient, errors

from . import StorageInterface
from src.config import config
from src.models import ShoppingCart, Product


CATEGORIES_COLLECTION: str = config.MONGODB.CATEGORIES_COLLECTION
PRODUCTS_COLLECTION: str = config.MONGODB.PRODUCTS_COLLECTION
SHOPPING_CART_COLLECTION: str = config.MONGODB.SHOPPING_CART_COLLECTION


class MongoDBStorage(StorageInterface):
    def __init__(self, connection_string: str, db_name: str):
        try:
            self.client = MongoClient(connection_string)
            self.db = self.client[db_name]

        except errors.ConnectionFailure as error:
            print(f'Error connecting to MongoDB: {error}')

        except errors.PyMongoError as error:
            print(f'An unexpected error occurred: {error}')

    def get_categories(self):
        categories = [doc['category_name'] for doc in self.db[CATEGORIES_COLLECTION].find()]
        return categories


    def get_products_by_category(self, category: str) -> list[Product]:
        cursor = self.db[PRODUCTS_COLLECTION].find({"category": category},{"category": 0})
        products = [
            Product(**item)
            for item in cursor
        ]
        return products


    def save_shopping_cart(self, shopping_cart: ShoppingCart):
        shopping_cart_doc = shopping_cart.to_dict()
        self.db[SHOPPING_CART_COLLECTION].insert_one(shopping_cart_doc)
