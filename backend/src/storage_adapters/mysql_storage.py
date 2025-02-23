import mysql.connector
from mysql.connector import Error

from . import StorageInterface

from src.models import ShoppingCart


class MySQLStorage(StorageInterface):
    def __init__(self, host: str, user: str, password: str, database: str):
        try:
            self.connection = mysql.connector.connect(
                host=host,
                user=user,
                password=password,
                database=database
            )
            self.cursor = self.connection.cursor()
        except Error as error:
            print(f"Error connecting to MySQL: {error}")

    def get_categories(self):
        ...

    def get_products_by_category(self, category: str) -> list[str]:
        ...

    def save_shopping_cart(self, cart: ShoppingCart):
        ...
