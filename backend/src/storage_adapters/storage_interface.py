from abc import ABC, abstractmethod

from src.models import ShoppingCart


class StorageInterface(ABC):
    @abstractmethod
    def get_categories(self):
        ...

    @abstractmethod
    def get_products_by_category(self, category: str):
        ...

    @abstractmethod
    def save_shopping_cart(self, cart: ShoppingCart):
        ...
